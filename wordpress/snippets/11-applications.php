<?php
/**
 * NAMI CMS — Applications inbox (admissions form)
 *
 * Requires the "NAMI CMS — Core engine" snippet (it holds the shared secret,
 * Settings → NAMI CMS). Paste as its own snippet, "Run snippet everywhere".
 *
 * What it does:
 *   - receives every admissions form submitted on the website
 *     (POST /?rest_route=/nami/v1/applications from the Next.js route
 *     src/app/api/admissions/route.ts, signed with the shared secret),
 *   - stores it under the "Applications" menu with all answers and the PDF,
 *   - emails the PDF to the admissions office of the right institution,
 *     and optionally a confirmation to the applicant,
 *   - lets staff set a status, keep internal notes, filter, download the PDF
 *     and export the list as CSV.
 *
 * Emails use WordPress's own mail function. On most hosts, install an SMTP
 * plugin (e.g. "WP Mail SMTP") so they are delivered reliably, then use
 * Applications → Email Settings → "Send test email".
 */

if ( ! defined( 'ABSPATH' ) || defined( 'NAMI_APPLICATIONS' ) ) {
	return;
}
define( 'NAMI_APPLICATIONS', '1.0.0' );

const NAMI_APP_TYPE = 'nami_application';
const NAMI_APP_CAP  = 'edit_pages';
const NAMI_APP_MAX_PDF_BYTES = 3145728; // 3 MB

/* ------------------------------------------------------------------
 * Lists and settings
 * ------------------------------------------------------------------ */

function nami_app_statuses() {
	return array(
		'new'       => 'New',
		'review'    => 'In review',
		'contacted' => 'Contacted',
		'accepted'  => 'Accepted',
		'declined'  => 'Declined',
	);
}

function nami_app_institutions() {
	return array(
		'school'    => 'NAMI International School (School & +2)',
		'college'   => 'NAMI College (A Levels)',
		'bachelors' => 'NAMI Institute (Bachelors & Masters)',
		'ctevt'     => 'CTEVT Programmes',
	);
}

function nami_app_settings() {
	$saved    = get_option( 'nami_app_settings', array() );
	$saved    = is_array( $saved ) ? $saved : array();
	$defaults = array(
		'to_school'       => 'admissions@nami.edu.np',
		'to_college'      => 'admissions@nami.edu.np',
		'to_bachelors'    => 'admissions@nami.edu.np',
		'to_ctevt'        => 'admissions@nami.edu.np',
		'attach_pdf'      => true,
		'confirm'         => false,
		'confirm_subject' => 'We have received your application ({reference})',
		'confirm_body'    => "Dear {name},\n\nThank you for applying to {institution} for {course}. Your reference number is {reference}.\n\nOur admissions office will review your application and contact you soon. A copy of your application is attached.\n\nNAMI Admissions",
	);
	return array_merge( $defaults, $saved );
}

/** Comma/line separated addresses → valid emails. */
function nami_app_emails( $raw ) {
	$list = preg_split( '/[\s,;]+/', (string) $raw );
	return array_values( array_filter( array_map( 'sanitize_email', $list ), 'is_email' ) );
}

function nami_app_meta( $post_id, $key ) {
	return get_post_meta( $post_id, '_nami_' . $key, true );
}

function nami_app_reference( $post_id ) {
	$reference = (string) nami_app_meta( $post_id, 'reference' );
	return '' !== $reference ? $reference : '#' . $post_id;
}

/* ------------------------------------------------------------------
 * Post type
 * ------------------------------------------------------------------ */

add_action(
	'init',
	function () {
		register_post_type(
			NAMI_APP_TYPE,
			array(
				'labels'          => array(
					'name'               => 'Applications',
					'singular_name'      => 'Application',
					'menu_name'          => 'Applications',
					'all_items'          => 'All Applications',
					'edit_item'          => 'Application',
					'search_items'       => 'Search Applications',
					'not_found'          => 'No applications yet.',
					'not_found_in_trash' => 'No applications in the trash.',
				),
				'public'          => false,
				'show_ui'         => true,
				'show_in_menu'    => true,
				'show_in_rest'    => false,
				'menu_position'   => 3,
				'menu_icon'       => 'dashicons-clipboard',
				'supports'        => array( 'title' ),
				'capability_type' => 'page',
				'map_meta_cap'    => true,
				'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
				'rewrite'         => false,
				'query_var'       => false,
			)
		);
	}
);

/* ------------------------------------------------------------------
 * Receiving applications from the website
 * ------------------------------------------------------------------ */

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'nami/v1',
			'/applications',
			array(
				'methods'             => 'POST',
				'permission_callback' => function ( WP_REST_Request $request ) {
					if ( ! function_exists( 'nami_cms_settings' ) ) {
						return new WP_Error( 'nami_app_core_missing', 'The NAMI CMS core snippet is not active.', array( 'status' => 503 ) );
					}
					$secret = (string) nami_cms_settings()['secret'];
					$given  = (string) $request->get_header( 'x-nami-secret' );
					return '' !== $secret && hash_equals( $secret, $given );
				},
				'callback'            => 'nami_app_receive',
			)
		);
	}
);

function nami_app_text( $value, $max = 500 ) {
	return mb_substr( sanitize_text_field( is_scalar( $value ) ? (string) $value : '' ), 0, $max );
}

/** Keeps only the {kind, heading, rows|groups|value} structure, as plain text. */
function nami_app_clean_blocks( $blocks ) {
	$rows_of = function ( $rows ) {
		$clean = array();
		foreach ( is_array( $rows ) ? $rows : array() as $row ) {
			if ( is_array( $row ) ) {
				$clean[] = array(
					'label' => nami_app_text( $row['label'] ?? '', 200 ),
					'value' => mb_substr( sanitize_textarea_field( (string) ( $row['value'] ?? '' ) ), 0, 5000 ),
				);
			}
		}
		return $clean;
	};

	$clean = array();
	foreach ( is_array( $blocks ) ? $blocks : array() as $block ) {
		if ( ! is_array( $block ) ) {
			continue;
		}
		$kind = (string) ( $block['kind'] ?? '' );
		$item = array(
			'kind'    => $kind,
			'heading' => nami_app_text( $block['heading'] ?? '', 200 ),
		);
		if ( 'fields' === $kind ) {
			$item['rows'] = $rows_of( $block['rows'] ?? array() );
		} elseif ( 'groups' === $kind ) {
			$item['entryLabel'] = nami_app_text( $block['entryLabel'] ?? '', 100 );
			$item['groups']     = array_map( $rows_of, is_array( $block['groups'] ?? null ) ? $block['groups'] : array() );
		} elseif ( 'prose' === $kind ) {
			$item['value'] = mb_substr( sanitize_textarea_field( (string) ( $block['value'] ?? '' ) ), 0, 10000 );
		} else {
			continue;
		}
		$clean[] = $item;
	}
	return $clean;
}

function nami_app_receive( WP_REST_Request $request ) {
	$body = $request->get_json_params();
	if ( ! is_array( $body ) ) {
		return new WP_Error( 'nami_app_bad_body', 'Invalid application.', array( 'status' => 400 ) );
	}

	$pdf = base64_decode( (string) ( $body['pdf'] ?? '' ), true );
	if ( false === $pdf || 0 !== strpos( $pdf, '%PDF' ) || strlen( $pdf ) > NAMI_APP_MAX_PDF_BYTES ) {
		return new WP_Error( 'nami_app_bad_pdf', 'Invalid PDF.', array( 'status' => 400 ) );
	}

	$applicant   = is_array( $body['applicant'] ?? null ) ? $body['applicant'] : array();
	$name        = nami_app_text( $applicant['name'] ?? '', 200 );
	$email       = sanitize_email( (string) ( $applicant['email'] ?? '' ) );
	$phone       = nami_app_text( $applicant['phone'] ?? '', 60 );
	$institution = sanitize_key( (string) ( $body['institution'] ?? '' ) );
	$institution = isset( nami_app_institutions()[ $institution ] ) ? $institution : 'school';
	$course      = nami_app_text( $body['courseLabel'] ?? '', 200 );
	$proposed    = nami_app_text( $body['proposedCourse'] ?? '', 200 );

	$post_id = wp_insert_post(
		array(
			'post_type'   => NAMI_APP_TYPE,
			'post_status' => 'publish',
			'post_title'  => trim( $name . ' — ' . ( '' !== $proposed ? $proposed : $course ) ),
		),
		true
	);
	if ( is_wp_error( $post_id ) ) {
		return new WP_Error( 'nami_app_store_failed', 'The application could not be stored.', array( 'status' => 500 ) );
	}

	$reference = sprintf( 'NAMI-%s-%05d', wp_date( 'Y' ), $post_id );
	$meta      = array(
		'reference'        => $reference,
		'status'           => 'new',
		'name'             => $name,
		'email'            => $email,
		'phone'            => $phone,
		'institution'      => $institution,
		'institution_name' => nami_app_text( $body['institutionName'] ?? '', 200 ),
		'program'          => sanitize_key( (string) ( $body['program'] ?? '' ) ),
		'course'           => $course,
		'proposed'         => $proposed,
		'blocks'           => wp_json_encode( nami_app_clean_blocks( $body['blocks'] ?? array() ) ),
		'data'             => wp_json_encode( is_array( $body['data'] ?? null ) ? $body['data'] : array() ),
		'pdf'              => base64_encode( $pdf ),
	);
	foreach ( $meta as $key => $value ) {
		update_post_meta( $post_id, '_nami_' . $key, wp_slash( $value ) );
	}

	nami_app_send_emails( $post_id, $pdf );

	return rest_ensure_response( array( 'reference' => $reference ) );
}

/* ------------------------------------------------------------------
 * Emails
 * ------------------------------------------------------------------ */

function nami_app_blocks_html( $post_id ) {
	$blocks = json_decode( (string) nami_app_meta( $post_id, 'blocks' ), true );
	$rows   = function ( $rows ) {
		$html = '<table style="border-collapse:collapse;width:100%;margin:0 0 12px">';
		foreach ( $rows as $row ) {
			$html .= sprintf(
				'<tr><th style="text-align:left;vertical-align:top;padding:6px 10px;border-bottom:1px solid #e5e5e5;width:35%%;font-weight:600">%s</th><td style="padding:6px 10px;border-bottom:1px solid #e5e5e5;white-space:pre-wrap">%s</td></tr>',
				esc_html( $row['label'] ?? '' ),
				esc_html( $row['value'] ?? '' )
			);
		}
		return $html . '</table>';
	};

	$html = '';
	foreach ( is_array( $blocks ) ? $blocks : array() as $block ) {
		$html .= '<h3 style="margin:18px 0 6px;color:#bd1b21;font-size:15px">' . esc_html( $block['heading'] ?? '' ) . '</h3>';
		if ( 'fields' === ( $block['kind'] ?? '' ) ) {
			$html .= $rows( $block['rows'] ?? array() );
		} elseif ( 'groups' === ( $block['kind'] ?? '' ) ) {
			$groups = $block['groups'] ?? array();
			if ( empty( $groups ) ) {
				$html .= '<p>No entries provided.</p>';
			}
			foreach ( $groups as $index => $group ) {
				$html .= '<p style="margin:8px 0 4px;font-weight:600">' . esc_html( ( $block['entryLabel'] ?? '' ) . ' ' . ( $index + 1 ) ) . '</p>' . $rows( $group );
			}
		} else {
			$html .= '<p style="white-space:pre-wrap">' . esc_html( $block['value'] ?? '' ) . '</p>';
		}
	}
	return $html;
}

/** Writes the PDF to a temporary file for wp_mail; the caller deletes it. */
function nami_app_temp_pdf( $post_id, $pdf ) {
	$dir  = trailingslashit( get_temp_dir() ) . 'nami-app-' . wp_generate_password( 12, false );
	$file = $dir . '/' . nami_app_reference( $post_id ) . '.pdf';
	if ( ! wp_mkdir_p( $dir ) || false === file_put_contents( $file, $pdf ) ) {
		return null;
	}
	return $file;
}

function nami_app_cleanup_temp( $file ) {
	if ( $file && file_exists( $file ) ) {
		unlink( $file );
		rmdir( dirname( $file ) );
	}
}

$GLOBALS['nami_app_mail_error'] = '';
add_action(
	'wp_mail_failed',
	function ( $error ) {
		$GLOBALS['nami_app_mail_error'] = $error instanceof WP_Error ? $error->get_error_message() : 'unknown error';
	}
);

function nami_app_send_emails( $post_id, $pdf ) {
	$settings    = nami_app_settings();
	$institution = (string) nami_app_meta( $post_id, 'institution' );
	$to          = nami_app_emails( $settings[ 'to_' . $institution ] ?? '' );
	$reference   = nami_app_reference( $post_id );
	$name        = (string) nami_app_meta( $post_id, 'name' );
	$email       = (string) nami_app_meta( $post_id, 'email' );
	$course      = (string) nami_app_meta( $post_id, 'proposed' );
	$course      = '' !== $course ? $course : (string) nami_app_meta( $post_id, 'course' );
	$file        = nami_app_temp_pdf( $post_id, $pdf );
	$attachments = ( $file && $settings['attach_pdf'] ) ? array( $file ) : array();
	$html        = array( 'Content-Type: text/html; charset=UTF-8' );
	$errors      = array();

	if ( ! empty( $to ) ) {
		$headers = $html;
		if ( is_email( $email ) ) {
			$headers[] = 'Reply-To: ' . str_replace( array( "\r", "\n" ), '', $name ) . ' <' . $email . '>';
		}
		$link = admin_url( 'post.php?post=' . $post_id . '&action=edit' );
		$body = sprintf(
			'<div style="font-family:Arial,sans-serif;font-size:14px;color:#212529"><p>A new application was submitted on the website.</p><p><strong>Reference:</strong> %s<br><strong>Applicant:</strong> %s<br><strong>Course:</strong> %s<br><strong>Phone:</strong> %s<br><strong>Email:</strong> %s</p><p><a href="%s">Open it in WordPress</a>%s</p><hr>%s</div>',
			esc_html( $reference ),
			esc_html( $name ),
			esc_html( $course ),
			esc_html( (string) nami_app_meta( $post_id, 'phone' ) ),
			esc_html( $email ),
			esc_url( $link ),
			empty( $attachments ) ? '' : ' — the PDF is attached.',
			nami_app_blocks_html( $post_id )
		);
		$GLOBALS['nami_app_mail_error'] = '';
		if ( ! wp_mail( $to, 'New application: ' . $name . ' — ' . $course . ' (' . $reference . ')', $body, $headers, $attachments ) ) {
			$errors[] = 'Admissions email: ' . ( $GLOBALS['nami_app_mail_error'] ?: 'not sent' );
		}
	} else {
		$errors[] = 'Admissions email: no recipient set for this institution';
	}

	if ( $settings['confirm'] && is_email( $email ) ) {
		$replace = array(
			'{name}'        => $name,
			'{reference}'   => $reference,
			'{course}'      => $course,
			'{institution}' => (string) nami_app_meta( $post_id, 'institution_name' ),
		);
		$subject = strtr( (string) $settings['confirm_subject'], $replace );
		$body    = '<div style="font-family:Arial,sans-serif;font-size:14px;color:#212529">' . nl2br( esc_html( strtr( (string) $settings['confirm_body'], $replace ) ) ) . '</div>';
		$GLOBALS['nami_app_mail_error'] = '';
		if ( ! wp_mail( $email, $subject, $body, $html, $attachments ) ) {
			$errors[] = 'Confirmation email: ' . ( $GLOBALS['nami_app_mail_error'] ?: 'not sent' );
		}
	}

	nami_app_cleanup_temp( $file );
	update_post_meta( $post_id, '_nami_mail_errors', wp_slash( implode( "\n", $errors ) ) );
}

/* ------------------------------------------------------------------
 * List screen: columns, filters, counts
 * ------------------------------------------------------------------ */

function nami_app_pdf_url( $post_id ) {
	return wp_nonce_url( admin_url( 'admin-post.php?action=nami_app_pdf&id=' . $post_id ), 'nami_app_pdf_' . $post_id );
}

add_filter(
	'manage_' . NAMI_APP_TYPE . '_posts_columns',
	function () {
		return array(
			'cb'          => '<input type="checkbox">',
			'title'       => 'Applicant & course',
			'reference'   => 'Reference',
			'institution' => 'Institution',
			'contact'     => 'Contact',
			'status'      => 'Status',
			'received'    => 'Received',
			'pdf'         => 'PDF',
		);
	}
);

add_action(
	'manage_' . NAMI_APP_TYPE . '_posts_custom_column',
	function ( $column, $post_id ) {
		switch ( $column ) {
			case 'reference':
				echo esc_html( nami_app_reference( $post_id ) );
				if ( '' !== (string) nami_app_meta( $post_id, 'mail_errors' ) ) {
					echo '<br><span style="color:#b32d2e" title="' . esc_attr( (string) nami_app_meta( $post_id, 'mail_errors' ) ) . '">⚠ email not sent</span>';
				}
				break;
			case 'institution':
				echo esc_html( nami_app_institutions()[ (string) nami_app_meta( $post_id, 'institution' ) ] ?? '' );
				break;
			case 'contact':
				$phone = (string) nami_app_meta( $post_id, 'phone' );
				$email = (string) nami_app_meta( $post_id, 'email' );
				echo esc_html( $phone );
				if ( '' !== $email ) {
					echo '<br><a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>';
				}
				break;
			case 'status':
				$status = (string) nami_app_meta( $post_id, 'status' );
				$colour = 'new' === $status ? '#bd1b21' : '#50575e';
				printf( '<strong style="color:%s">%s</strong>', esc_attr( $colour ), esc_html( nami_app_statuses()[ $status ] ?? $status ) );
				break;
			case 'received':
				echo esc_html( get_the_date( 'j M Y, g:i a', $post_id ) );
				break;
			case 'pdf':
				printf( '<a class="button button-small" href="%s">Download</a>', esc_url( nami_app_pdf_url( $post_id ) ) );
				break;
		}
	},
	10,
	2
);

add_filter(
	'manage_edit-' . NAMI_APP_TYPE . '_sortable_columns',
	function ( $columns ) {
		$columns['received'] = 'date';
		return $columns;
	}
);

add_filter(
	'post_row_actions',
	function ( $actions, $post ) {
		if ( NAMI_APP_TYPE !== $post->post_type ) {
			return $actions;
		}
		unset( $actions['inline hide-if-no-js'] );
		if ( isset( $actions['edit'] ) ) {
			$actions['edit'] = sprintf( '<a href="%s">Open</a>', esc_url( get_edit_post_link( $post->ID ) ) );
		}
		$actions['pdf'] = sprintf( '<a href="%s">Download PDF</a>', esc_url( nami_app_pdf_url( $post->ID ) ) );
		return $actions;
	},
	10,
	2
);

add_filter(
	'bulk_actions-edit-' . NAMI_APP_TYPE,
	function ( $actions ) {
		unset( $actions['edit'] );
		return $actions;
	}
);

/** The filters on the list screen, also used by the CSV export. */
function nami_app_current_filters() {
	return array(
		'status'      => isset( $_GET['nami_status'] ) ? sanitize_key( wp_unslash( $_GET['nami_status'] ) ) : '',
		'institution' => isset( $_GET['nami_institution'] ) ? sanitize_key( wp_unslash( $_GET['nami_institution'] ) ) : '',
	);
}

function nami_app_meta_query( array $filters ) {
	$query = array();
	if ( isset( nami_app_statuses()[ $filters['status'] ] ) ) {
		$query[] = array( 'key' => '_nami_status', 'value' => $filters['status'] );
	}
	if ( isset( nami_app_institutions()[ $filters['institution'] ] ) ) {
		$query[] = array( 'key' => '_nami_institution', 'value' => $filters['institution'] );
	}
	return $query;
}

add_action(
	'restrict_manage_posts',
	function ( $post_type ) {
		if ( NAMI_APP_TYPE !== $post_type ) {
			return;
		}
		$filters = nami_app_current_filters();
		echo '<select name="nami_status"><option value="">All statuses</option>';
		foreach ( nami_app_statuses() as $value => $label ) {
			printf( '<option value="%s"%s>%s</option>', esc_attr( $value ), selected( $filters['status'], $value, false ), esc_html( $label ) );
		}
		echo '</select><select name="nami_institution"><option value="">All institutions</option>';
		foreach ( nami_app_institutions() as $value => $label ) {
			printf( '<option value="%s"%s>%s</option>', esc_attr( $value ), selected( $filters['institution'], $value, false ), esc_html( $label ) );
		}
		echo '</select>';
	}
);

add_action(
	'pre_get_posts',
	function ( $query ) {
		if ( ! is_admin() || ! $query->is_main_query() || NAMI_APP_TYPE !== $query->get( 'post_type' ) ) {
			return;
		}
		$meta_query = nami_app_meta_query( nami_app_current_filters() );
		if ( ! empty( $meta_query ) ) {
			$query->set( 'meta_query', $meta_query );
		}
		// Searching for a reference such as NAMI-2026-00042 opens that application.
		$search = (string) $query->get( 's' );
		if ( '' !== $search && preg_match( '/^NAMI-\d{4}-(\d+)$/i', trim( $search ), $match ) ) {
			$query->set( 's', '' );
			$query->set( 'p', (int) $match[1] );
		}
	}
);

// "Export CSV" button above the list, respecting the current filters.
add_action(
	'manage_posts_extra_tablenav',
	function ( $which ) {
		$screen = get_current_screen();
		if ( 'top' !== $which || ! $screen || 'edit-' . NAMI_APP_TYPE !== $screen->id ) {
			return;
		}
		$filters = nami_app_current_filters();
		$url     = wp_nonce_url(
			add_query_arg(
				array(
					'action'           => 'nami_app_csv',
					'nami_status'      => $filters['status'],
					'nami_institution' => $filters['institution'],
				),
				admin_url( 'admin-post.php' )
			),
			'nami_app_csv'
		);
		printf( '<div class="alignleft actions"><a class="button" href="%s">Export CSV</a></div>', esc_url( $url ) );
	}
);

// Red bubble with the number of new applications next to the menu item.
add_action(
	'admin_menu',
	function () {
		global $menu;
		if ( ! current_user_can( NAMI_APP_CAP ) || ! is_array( $menu ) ) {
			return;
		}
		$new = new WP_Query(
			array(
				'post_type'      => NAMI_APP_TYPE,
				'post_status'    => 'publish',
				'meta_key'       => '_nami_status',
				'meta_value'     => 'new',
				'fields'         => 'ids',
				'posts_per_page' => 1,
				'no_found_rows'  => false,
			)
		);
		if ( $new->found_posts < 1 ) {
			return;
		}
		foreach ( $menu as $index => $item ) {
			if ( 'edit.php?post_type=' . NAMI_APP_TYPE === ( $item[2] ?? '' ) ) {
				$menu[ $index ][0] .= sprintf( ' <span class="awaiting-mod"><span class="pending-count">%d</span></span>', (int) $new->found_posts );
			}
		}
	},
	99
);

/* ------------------------------------------------------------------
 * Application screen: answers, status & notes, PDF
 * ------------------------------------------------------------------ */

add_action(
	'add_meta_boxes_' . NAMI_APP_TYPE,
	function ( $post ) {
		remove_meta_box( 'slugdiv', NAMI_APP_TYPE, 'normal' );
		add_meta_box(
			'nami_app_answers',
			'Answers',
			function ( $post ) {
				echo '<div class="nami-app-answers">' . nami_app_blocks_html( $post->ID ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in nami_app_blocks_html.
			},
			NAMI_APP_TYPE,
			'normal',
			'high'
		);
		add_meta_box(
			'nami_app_manage',
			'Status & notes',
			function ( $post ) {
				wp_nonce_field( 'nami_app_manage', 'nami_app_manage_nonce' );
				$status = (string) nami_app_meta( $post->ID, 'status' );
				printf( '<p><strong>%s</strong><br>Received %s</p>', esc_html( nami_app_reference( $post->ID ) ), esc_html( get_the_date( 'j M Y, g:i a', $post ) ) );
				echo '<p><label for="nami_app_status"><strong>Status</strong></label><br><select id="nami_app_status" name="nami_app_status" style="width:100%">';
				foreach ( nami_app_statuses() as $value => $label ) {
					printf( '<option value="%s"%s>%s</option>', esc_attr( $value ), selected( $status, $value, false ), esc_html( $label ) );
				}
				echo '</select></p>';
				printf(
					'<p><label for="nami_app_notes"><strong>Internal notes</strong> (only staff see these)</label><textarea id="nami_app_notes" name="nami_app_notes" rows="6" style="width:100%%">%s</textarea></p>',
					esc_textarea( (string) nami_app_meta( $post->ID, 'notes' ) )
				);
				printf( '<p><a class="button button-primary" href="%s">Download PDF</a></p>', esc_url( nami_app_pdf_url( $post->ID ) ) );
				$errors = (string) nami_app_meta( $post->ID, 'mail_errors' );
				if ( '' !== $errors ) {
					printf( '<p style="color:#b32d2e"><strong>Email problem:</strong><br>%s</p>', nl2br( esc_html( $errors ) ) );
				}
				echo '<p class="description">Press "Update" to save the status and notes.</p>';
			},
			NAMI_APP_TYPE,
			'side',
			'high'
		);
	}
);

add_action(
	'save_post_' . NAMI_APP_TYPE,
	function ( $post_id ) {
		if ( ! isset( $_POST['nami_app_manage_nonce'] ) || ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST['nami_app_manage_nonce'] ) ), 'nami_app_manage' ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
		$status = sanitize_key( wp_unslash( $_POST['nami_app_status'] ?? '' ) );
		if ( isset( nami_app_statuses()[ $status ] ) ) {
			update_post_meta( $post_id, '_nami_status', $status );
		}
		update_post_meta( $post_id, '_nami_notes', wp_slash( sanitize_textarea_field( wp_unslash( $_POST['nami_app_notes'] ?? '' ) ) ) );
	}
);

/* ------------------------------------------------------------------
 * Downloads: PDF and CSV
 * ------------------------------------------------------------------ */

add_action(
	'admin_post_nami_app_pdf',
	function () {
		$post_id = isset( $_GET['id'] ) ? absint( $_GET['id'] ) : 0;
		check_admin_referer( 'nami_app_pdf_' . $post_id );
		if ( NAMI_APP_TYPE !== get_post_type( $post_id ) || ! current_user_can( 'edit_post', $post_id ) ) {
			wp_die( 'You are not allowed to download this application.', 403 );
		}
		$pdf = base64_decode( (string) nami_app_meta( $post_id, 'pdf' ), true );
		if ( false === $pdf || '' === $pdf ) {
			wp_die( 'This application has no PDF.', 404 );
		}
		$name = sanitize_file_name( nami_app_reference( $post_id ) . '-' . (string) nami_app_meta( $post_id, 'name' ) . '.pdf' );
		nocache_headers();
		header( 'Content-Type: application/pdf' );
		header( 'Content-Disposition: attachment; filename="' . $name . '"' );
		header( 'Content-Length: ' . strlen( $pdf ) );
		echo $pdf; // phpcs:ignore WordPress.Security.EscapeOutput -- binary PDF.
		exit;
	}
);

add_action(
	'admin_post_nami_app_csv',
	function () {
		check_admin_referer( 'nami_app_csv' );
		if ( ! current_user_can( NAMI_APP_CAP ) ) {
			wp_die( 'You are not allowed to export applications.', 403 );
		}
		$ids = get_posts(
			array(
				'post_type'      => NAMI_APP_TYPE,
				'post_status'    => 'publish',
				'posts_per_page' => -1,
				'fields'         => 'ids',
				'orderby'        => 'date',
				'order'          => 'DESC',
				'meta_query'     => nami_app_meta_query( nami_app_current_filters() ),
			)
		);

		nocache_headers();
		header( 'Content-Type: text/csv; charset=UTF-8' );
		header( 'Content-Disposition: attachment; filename="nami-applications-' . wp_date( 'Y-m-d' ) . '.csv"' );
		$out = fopen( 'php://output', 'w' );
		fwrite( $out, "\xEF\xBB\xBF" ); // Lets Excel read the file as UTF-8.
		fputcsv( $out, array( 'Reference', 'Received', 'Status', 'Applicant', 'Email', 'Phone', 'Institution', 'Course', 'Proposed course / grade', 'Notes' ) );
		// Spreadsheet apps run cells that start with = + - @ as formulas.
		$cell = function ( $value ) {
			$value = (string) $value;
			return preg_match( '/^[=+\-@]/', $value ) ? "'" . $value : $value;
		};
		foreach ( $ids as $id ) {
			fputcsv(
				$out,
				array_map(
					$cell,
					array(
						nami_app_reference( $id ),
						get_the_date( 'Y-m-d H:i', $id ),
						nami_app_statuses()[ (string) nami_app_meta( $id, 'status' ) ] ?? '',
						nami_app_meta( $id, 'name' ),
						nami_app_meta( $id, 'email' ),
						nami_app_meta( $id, 'phone' ),
						nami_app_institutions()[ (string) nami_app_meta( $id, 'institution' ) ] ?? '',
						nami_app_meta( $id, 'course' ),
						nami_app_meta( $id, 'proposed' ),
						nami_app_meta( $id, 'notes' ),
					)
				)
			);
		}
		fclose( $out );
		exit;
	}
);

/* ------------------------------------------------------------------
 * Email settings (Applications → Email Settings)
 * ------------------------------------------------------------------ */

add_action(
	'admin_menu',
	function () {
		add_submenu_page(
			'edit.php?post_type=' . NAMI_APP_TYPE,
			'Application Email Settings',
			'Email Settings',
			'manage_options',
			'nami-app-settings',
			'nami_app_render_settings'
		);
	}
);

add_action(
	'admin_post_nami_app_settings',
	function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'You are not allowed to change these settings.', 403 );
		}
		check_admin_referer( 'nami_app_settings' );
		$settings = array(
			'attach_pdf'      => ! empty( $_POST['attach_pdf'] ),
			'confirm'         => ! empty( $_POST['confirm'] ),
			'confirm_subject' => sanitize_text_field( wp_unslash( $_POST['confirm_subject'] ?? '' ) ),
			'confirm_body'    => sanitize_textarea_field( wp_unslash( $_POST['confirm_body'] ?? '' ) ),
		);
		foreach ( array_keys( nami_app_institutions() ) as $key ) {
			$settings[ 'to_' . $key ] = implode( ', ', nami_app_emails( wp_unslash( $_POST[ 'to_' . $key ] ?? '' ) ) );
		}
		update_option( 'nami_app_settings', $settings, false );

		$status = 'saved';
		if ( ! empty( $_POST['send_test'] ) ) {
			$to = nami_app_emails( implode( ',', array_map( function ( $key ) use ( $settings ) {
				return $settings[ 'to_' . $key ];
			}, array_keys( nami_app_institutions() ) ) ) );
			$to = array_values( array_unique( $to ) );
			$GLOBALS['nami_app_mail_error'] = '';
			$sent   = ! empty( $to ) && wp_mail( $to, 'NAMI website: test email', 'This is a test from Applications → Email Settings. If you can read this, application emails will arrive here.' );
			$status = $sent ? 'test_ok' : 'test_failed';
			if ( ! $sent ) {
				set_transient( 'nami_app_test_error_' . get_current_user_id(), empty( $to ) ? 'no recipients set' : ( $GLOBALS['nami_app_mail_error'] ?: 'wp_mail returned false' ), 120 );
			}
		}
		wp_safe_redirect( add_query_arg( array( 'post_type' => NAMI_APP_TYPE, 'page' => 'nami-app-settings', 'nami_status' => $status ), admin_url( 'edit.php' ) ) );
		exit;
	}
);

function nami_app_render_settings() {
	$settings = nami_app_settings();
	$status   = isset( $_GET['nami_status'] ) ? sanitize_key( $_GET['nami_status'] ) : '';
	echo '<div class="wrap"><h1>Application Email Settings</h1>';
	if ( 'saved' === $status ) {
		echo '<div class="notice notice-success is-dismissible"><p>Settings saved.</p></div>';
	} elseif ( 'test_ok' === $status ) {
		echo '<div class="notice notice-success is-dismissible"><p>Settings saved and a test email was sent to every address below. Check those inboxes (and spam folders).</p></div>';
	} elseif ( 'test_failed' === $status ) {
		$error = get_transient( 'nami_app_test_error_' . get_current_user_id() );
		printf( '<div class="notice notice-error"><p>Settings saved, but the test email could not be sent (%s). Install and set up an SMTP plugin such as "WP Mail SMTP", then try again.</p></div>', esc_html( $error ? $error : 'unknown error' ) );
	}

	echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
	echo '<input type="hidden" name="action" value="nami_app_settings">';
	wp_nonce_field( 'nami_app_settings' );
	echo '<h2>Who is told about new applications</h2><p>Each application is emailed to the addresses for its institution. Separate several addresses with commas.</p>';
	echo '<table class="form-table" role="presentation"><tbody>';
	foreach ( nami_app_institutions() as $key => $label ) {
		printf(
			'<tr><th scope="row"><label for="to_%1$s">%2$s</label></th><td><input type="text" class="large-text" id="to_%1$s" name="to_%1$s" value="%3$s"></td></tr>',
			esc_attr( $key ),
			esc_html( $label ),
			esc_attr( $settings[ 'to_' . $key ] )
		);
	}
	printf( '<tr><th scope="row">PDF</th><td><label><input type="checkbox" name="attach_pdf" value="1"%s> Attach the application PDF to the emails</label></td></tr>', checked( $settings['attach_pdf'], true, false ) );
	echo '</tbody></table>';

	echo '<h2>Confirmation to the applicant</h2><table class="form-table" role="presentation"><tbody>';
	printf( '<tr><th scope="row">Send</th><td><label><input type="checkbox" name="confirm" value="1"%s> Email the applicant a confirmation when they submit (only when they gave an email address)</label></td></tr>', checked( $settings['confirm'], true, false ) );
	printf( '<tr><th scope="row"><label for="confirm_subject">Subject</label></th><td><input type="text" class="large-text" id="confirm_subject" name="confirm_subject" value="%s"></td></tr>', esc_attr( $settings['confirm_subject'] ) );
	printf( '<tr><th scope="row"><label for="confirm_body">Message</label></th><td><textarea class="large-text" rows="9" id="confirm_body" name="confirm_body">%s</textarea><p class="description">You can use {name}, {reference}, {course} and {institution}.</p></td></tr>', esc_textarea( $settings['confirm_body'] ) );
	echo '</tbody></table>';

	echo '<p class="submit"><button type="submit" class="button button-primary">Save settings</button> <button type="submit" name="send_test" value="1" class="button">Save and send test email</button></p>';
	echo '</form></div>';
}
