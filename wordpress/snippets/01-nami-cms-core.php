<?php
/**
 * NAMI CMS — Core engine
 *
 * Add this snippet FIRST (Code Snippets → Add New → PHP, "Run snippet everywhere").
 * It contains no page content of its own. Each page snippet (02-home-page.php, …)
 * registers its sections through the `nami_cms_pages` filter, and this engine:
 *   - builds the admin menus (e.g. "Home" → Hero, About, Stats …),
 *   - renders the edit forms (text, images, videos, links, repeatable lists),
 *   - saves and sanitises the values,
 *   - serves them to Next.js at /wp-json/nami/v1/pages/{page},
 *   - tells the Next.js site to refresh right after every save,
 *   - runs "collections": lists where editors add items one by one (notices,
 *     vacancies …), registered through the `nami_cms_collections` filter and
 *     served at /wp-json/nami/v1/collections/{collection}.
 *
 * Website connection: Settings → NAMI CMS (or define NAMI_SITE_URL and
 * NAMI_REVALIDATE_SECRET in wp-config.php).
 */

if ( ! defined( 'ABSPATH' ) || defined( 'NAMI_CMS_CORE' ) ) {
	return;
}
define( 'NAMI_CMS_CORE', '1.2.0' );
define( 'NAMI_CMS_CAP', 'edit_pages' );

/* ------------------------------------------------------------------
 * Registry & storage
 * ------------------------------------------------------------------ */

function nami_cms_pages() {
	static $cache = null;
	if ( null !== $cache ) {
		return $cache;
	}
	$pages = apply_filters( 'nami_cms_pages', array() );
	$pages = is_array( $pages ) ? $pages : array();
	if ( did_action( 'init' ) ) {
		$cache = $pages;
	}
	return $pages;
}

function nami_cms_option_name( $slug ) {
	return 'nami_cms_page_' . $slug;
}

/** Defaults from the page snippet, overlaid with whatever editors saved. */
function nami_cms_get_values( $slug ) {
	$pages = nami_cms_pages();
	if ( ! isset( $pages[ $slug ] ) ) {
		return null;
	}
	$page     = $pages[ $slug ];
	$defaults = isset( $page['defaults'] ) && is_array( $page['defaults'] ) ? $page['defaults'] : array();
	$saved    = get_option( nami_cms_option_name( $slug ), array() );
	$saved    = is_array( $saved ) ? $saved : array();

	$values = array();
	foreach ( $page['sections'] as $id => $section ) {
		$d             = isset( $defaults[ $id ] ) && is_array( $defaults[ $id ] ) ? $defaults[ $id ] : array();
		$s             = isset( $saved[ $id ] ) && is_array( $saved[ $id ] ) ? $saved[ $id ] : array();
		$values[ $id ] = array_merge( $d, $s );
	}
	return $values;
}

/* ------------------------------------------------------------------
 * Website connection settings
 * ------------------------------------------------------------------ */

function nami_cms_settings() {
	$saved = get_option( 'nami_cms_settings', array() );
	$saved = is_array( $saved ) ? $saved : array();
	return array(
		'site_url' => defined( 'NAMI_SITE_URL' ) ? (string) NAMI_SITE_URL : (string) ( $saved['site_url'] ?? '' ),
		'secret'   => defined( 'NAMI_REVALIDATE_SECRET' ) ? (string) NAMI_REVALIDATE_SECRET : (string) ( $saved['secret'] ?? '' ),
	);
}

/** Pings the Next.js site so the saved page shows immediately. Returns ok|failed|unconfigured. */
function nami_cms_notify_site( $slug ) {
	$settings = nami_cms_settings();
	if ( '' === $settings['site_url'] || '' === $settings['secret'] ) {
		return 'unconfigured';
	}

	$response = wp_remote_post(
		untrailingslashit( $settings['site_url'] ) . '/api/revalidate',
		array(
			'timeout' => 8,
			'headers' => array(
				'Content-Type'  => 'application/json',
				'x-nami-secret' => $settings['secret'],
			),
			'body'    => wp_json_encode( array( 'page' => $slug ) ),
		)
	);

	if ( is_wp_error( $response ) ) {
		$error = $response->get_error_message();
	} else {
		$code  = (int) wp_remote_retrieve_response_code( $response );
		$error = 200 === $code ? '' : 'HTTP ' . $code;
	}

	if ( '' !== $error ) {
		set_transient( 'nami_cms_sync_error_' . get_current_user_id(), $error, 120 );
		return 'failed';
	}
	return 'ok';
}

/* ------------------------------------------------------------------
 * REST API: GET /wp-json/nami/v1/pages/{slug}
 * ------------------------------------------------------------------ */

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'nami/v1',
			'/pages/(?P<slug>[a-z0-9-]+)',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => function ( WP_REST_Request $request ) {
					$values = nami_cms_get_values( (string) $request['slug'] );
					if ( null === $values ) {
						return new WP_Error( 'nami_cms_not_found', 'Unknown page.', array( 'status' => 404 ) );
					}
					$response = rest_ensure_response( $values );
					$response->header( 'Cache-Control', 'no-store' );
					return $response;
				},
			)
		);
	}
);

/* ------------------------------------------------------------------
 * Admin menus (sidebar + top admin bar)
 * ------------------------------------------------------------------ */

function nami_cms_screen_slug( $page_slug, $section_id, $first_section ) {
	return $section_id === $first_section ? 'nami-' . $page_slug : 'nami-' . $page_slug . '--' . $section_id;
}

/** Resolves ?page=nami-home--hero to array( 'home', 'hero' ), or null. */
function nami_cms_current_screen() {
	$screen = isset( $_GET['page'] ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : '';
	if ( 0 !== strpos( $screen, 'nami-' ) ) {
		return null;
	}
	$parts   = explode( '--', substr( $screen, 5 ), 2 );
	$pages   = nami_cms_pages();
	$slug    = $parts[0];
	if ( ! isset( $pages[ $slug ] ) ) {
		return null;
	}
	$sections = $pages[ $slug ]['sections'];
	$section  = $parts[1] ?? array_key_first( $sections );
	return isset( $sections[ $section ] ) ? array( $slug, $section ) : null;
}

add_action(
	'admin_menu',
	function () {
		foreach ( nami_cms_pages() as $slug => $page ) {
			$first = array_key_first( $page['sections'] );
			// 'menu_parent' puts the sections inside another menu (e.g. a collection's).
			$parent = $page['menu_parent'] ?? 'nami-' . $slug;
			if ( ! isset( $page['menu_parent'] ) ) {
				add_menu_page(
					$page['title'],
					$page['menu_title'] ?? $page['title'],
					NAMI_CMS_CAP,
					$parent,
					'nami_cms_render_screen',
					$page['icon'] ?? 'dashicons-admin-page',
					$page['position'] ?? 3
				);
			}
			foreach ( $page['sections'] as $id => $section ) {
				add_submenu_page(
					$parent,
					$page['title'] . ' — ' . $section['title'],
					( $page['submenu_prefix'] ?? '' ) . $section['title'],
					NAMI_CMS_CAP,
					nami_cms_screen_slug( $slug, $id, $first ),
					'nami_cms_render_screen'
				);
			}
		}
		add_options_page( 'NAMI CMS', 'NAMI CMS', 'manage_options', 'nami-cms-settings', 'nami_cms_render_settings' );
	}
);

add_action(
	'admin_bar_menu',
	function ( $bar ) {
		if ( ! current_user_can( NAMI_CMS_CAP ) ) {
			return;
		}
		$pages = nami_cms_pages();
		if ( empty( $pages ) ) {
			return;
		}
		$bar->add_node(
			array(
				'id'    => 'nami-cms',
				'title' => 'Website Content',
				'href'  => admin_url( 'admin.php?page=nami-' . array_key_first( $pages ) ),
			)
		);
		foreach ( $pages as $slug => $page ) {
			$first = array_key_first( $page['sections'] );
			$bar->add_node(
				array(
					'id'     => 'nami-cms-' . $slug,
					'parent' => 'nami-cms',
					'title'  => esc_html( $page['menu_title'] ?? $page['title'] ),
					'href'   => admin_url( 'admin.php?page=nami-' . $slug ),
				)
			);
			foreach ( $page['sections'] as $id => $section ) {
				$bar->add_node(
					array(
						'id'     => 'nami-cms-' . $slug . '-' . $id,
						'parent' => 'nami-cms-' . $slug,
						'title'  => esc_html( $section['title'] ),
						'href'   => admin_url( 'admin.php?page=' . nami_cms_screen_slug( $slug, $id, $first ) ),
					)
				);
			}
		}
	},
	80
);

/* ------------------------------------------------------------------
 * Field rendering
 * ------------------------------------------------------------------ */

function nami_cms_field_id( $name ) {
	return 'nami-' . trim( preg_replace( '/[^a-z0-9_]+/i', '-', $name ), '-' );
}

/** Site-relative paths (/hero/x.jpg) are previewed from the Next.js site. */
function nami_cms_preview_url( $src ) {
	$src = (string) $src;
	if ( '' === $src ) {
		return '';
	}
	if ( 0 === strpos( $src, '/' ) && 0 !== strpos( $src, '//' ) ) {
		$site = nami_cms_settings()['site_url'];
		if ( '' === $site ) {
			return '';
		}
		$src = untrailingslashit( $site ) . str_replace( ' ', '%20', $src );
	}
	return $src;
}

/**
 * $depth counts the repeaters around this field. Each nesting level gets its own
 * row-index placeholder (__i0__, __i1__, …) so an inner list's template survives
 * when an outer row is cloned.
 */
function nami_cms_render_field( array $field, $name, $value, $row_title = false, $depth = 0 ) {
	$type = $field['type'];
	$id   = nami_cms_field_id( $name );
	$help = isset( $field['help'] ) ? '<p class="description">' . esc_html( $field['help'] ) . '</p>' : '';
	$title_attr = $row_title ? ' data-row-title' : '';

	switch ( $type ) {
		case 'text':
		case 'url':
		case 'video':
			$value       = is_scalar( $value ) ? (string) $value : '';
			$placeholder = 'text' === $type ? ( $field['placeholder'] ?? '' ) : '/page-path or https://…';
			if ( 'video' === $type ) {
				echo '<div class="nami-video">';
			}
			printf(
				'<input type="text" class="large-text" id="%s" name="%s" value="%s" placeholder="%s"%s>',
				esc_attr( $id ),
				esc_attr( $name ),
				esc_attr( $value ),
				esc_attr( $placeholder ),
				$title_attr // phpcs:ignore WordPress.Security.EscapeOutput
			);
			if ( 'video' === $type ) {
				echo '<p><button type="button" class="button nami-pick" data-kind="video">Choose / upload video</button></p></div>';
			}
			break;

		case 'date':
			$value = is_scalar( $value ) && preg_match( '/^\d{4}-\d{2}-\d{2}$/', (string) $value ) ? (string) $value : '';
			printf(
				'<input type="date" id="%s" name="%s" value="%s">',
				esc_attr( $id ),
				esc_attr( $name ),
				esc_attr( $value )
			);
			if ( ! isset( $field['help'] ) ) {
				$help = '<p class="description">Leave empty if there is no date.</p>';
			}
			break;

		case 'file':
			// A link to an uploaded file (e.g. a PDF notice) or any web address.
			printf(
				'<div class="nami-file"><input type="text" class="large-text" id="%s" name="%s" value="%s" placeholder="Upload a file, or paste a link"><p><button type="button" class="button nami-pick" data-kind="file">Choose / upload file</button></p></div>',
				esc_attr( $id ),
				esc_attr( $name ),
				esc_attr( is_scalar( $value ) ? (string) $value : '' )
			);
			break;

		case 'textarea':
			printf(
				'<textarea class="large-text" rows="%d" id="%s" name="%s"%s>%s</textarea>',
				(int) ( $field['rows'] ?? 4 ),
				esc_attr( $id ),
				esc_attr( $name ),
				$title_attr, // phpcs:ignore WordPress.Security.EscapeOutput
				esc_textarea( is_scalar( $value ) ? (string) $value : '' )
			);
			break;

		case 'lines':
		case 'paragraphs':
			$list  = is_array( $value ) ? array_filter( $value, 'is_scalar' ) : array();
			$glue  = 'lines' === $type ? "\n" : "\n\n";
			$rows  = (int) ( $field['rows'] ?? ( 'lines' === $type ? 5 : 12 ) );
			printf(
				'<textarea class="large-text" rows="%d" id="%s" name="%s">%s</textarea>',
				$rows,
				esc_attr( $id ),
				esc_attr( $name ),
				esc_textarea( implode( $glue, $list ) )
			);
			if ( ! isset( $field['help'] ) ) {
				$help = '<p class="description">' . ( 'lines' === $type ? 'One item per line.' : 'Leave an empty line between paragraphs.' ) . '</p>';
			}
			break;

		case 'number':
			printf(
				'<input type="number" step="any" class="small-text" id="%s" name="%s" value="%s">',
				esc_attr( $id ),
				esc_attr( $name ),
				esc_attr( is_numeric( $value ) ? (string) $value : '0' )
			);
			break;

		case 'toggle':
			printf(
				'<input type="hidden" name="%1$s" value="0"><label><input type="checkbox" id="%2$s" name="%1$s" value="1"%3$s> %4$s</label>',
				esc_attr( $name ),
				esc_attr( $id ),
				checked( ! empty( $value ), true, false ),
				esc_html( $field['toggle_label'] ?? 'Enabled' )
			);
			break;

		case 'select':
			printf( '<select id="%s" name="%s">', esc_attr( $id ), esc_attr( $name ) );
			foreach ( $field['options'] as $option_value => $option_label ) {
				printf(
					'<option value="%s"%s>%s</option>',
					esc_attr( $option_value ),
					selected( (string) $value, (string) $option_value, false ),
					esc_html( $option_label )
				);
			}
			echo '</select>';
			break;

		case 'link':
			$value = is_array( $value ) ? $value : array();
			printf(
				'<div class="nami-link"><label>Button text<input type="text" class="regular-text" id="%s" name="%s[label]" value="%s"%s></label><label>Link<input type="text" class="regular-text" name="%s[href]" value="%s" placeholder="/page-path or https://…"></label></div>',
				esc_attr( $id ),
				esc_attr( $name ),
				esc_attr( (string) ( $value['label'] ?? '' ) ),
				$title_attr, // phpcs:ignore WordPress.Security.EscapeOutput
				esc_attr( $name ),
				esc_attr( (string) ( $value['href'] ?? '' ) )
			);
			if ( ! isset( $field['help'] ) ) {
				$help = '<p class="description">Leave the button text empty to hide the button.</p>';
			}
			break;

		case 'image':
			$value   = is_array( $value ) ? $value : array();
			$src     = (string) ( $value['src'] ?? '' );
			$preview = nami_cms_preview_url( $src );
			echo '<div class="nami-image">';
			echo '<div class="nami-image__preview">';
			if ( '' !== $preview ) {
				printf( '<img src="%s" alt="">', esc_url( $preview ) );
			} else {
				echo '<span>' . ( '' === $src ? 'No image selected' : 'Preview unavailable — set the website URL under Settings → NAMI CMS' ) . '</span>';
			}
			echo '</div><div class="nami-image__meta">';
			printf( '<input type="hidden" class="nami-image__src" name="%s[src]" value="%s">', esc_attr( $name ), esc_attr( $src ) );
			printf( '<input type="hidden" class="nami-image__width" name="%s[width]" value="%d">', esc_attr( $name ), absint( $value['width'] ?? 0 ) );
			printf( '<input type="hidden" class="nami-image__height" name="%s[height]" value="%d">', esc_attr( $name ), absint( $value['height'] ?? 0 ) );
			echo '<p><button type="button" class="button nami-pick" data-kind="image">Choose / upload image</button> <button type="button" class="button-link nami-image__clear">Remove</button></p>';
			printf(
				'<label>Alt text (describes the image)<input type="text" class="large-text nami-image__alt" id="%s" name="%s[alt]" value="%s"%s></label>',
				esc_attr( $id ),
				esc_attr( $name ),
				esc_attr( (string) ( $value['alt'] ?? '' ) ),
				$title_attr // phpcs:ignore WordPress.Security.EscapeOutput
			);
			printf( '<p class="description nami-image__path">%s</p>', esc_html( $src ) );
			echo '</div></div>';
			break;

		case 'repeater':
			$rows        = is_array( $value ) ? array_values( array_filter( $value, 'is_array' ) ) : array();
			$placeholder = '__i' . (int) $depth . '__';
			printf( '<div class="nami-repeater" data-next-index="%d" data-placeholder="%s">', count( $rows ), esc_attr( $placeholder ) );
			echo '<div class="nami-repeater__rows">';
			foreach ( $rows as $index => $row ) {
				nami_cms_render_row( $field, $name, (string) $index, $row, $index + 1, false, $depth );
			}
			echo '</div><template class="nami-repeater__template">';
			nami_cms_render_row( $field, $name, $placeholder, array(), 0, true, $depth );
			printf(
				'</template><p><button type="button" class="button nami-repeater__add">+ Add %s</button></p></div>',
				esc_html( strtolower( $field['item_label'] ?? 'item' ) )
			);
			break;
	}

	echo $help; // phpcs:ignore WordPress.Security.EscapeOutput -- built from esc_html above.
}

function nami_cms_row_title( array $field, array $row ) {
	$key = $field['title_field'] ?? '';
	if ( '' === $key || ! isset( $row[ $key ] ) ) {
		return '';
	}
	$value = $row[ $key ];
	if ( is_array( $value ) ) {
		$value = $value['alt'] ?? ( $value['label'] ?? '' );
	}
	return is_scalar( $value ) ? wp_trim_words( (string) $value, 10 ) : '';
}

function nami_cms_render_row( array $field, $name, $index, array $row, $number, $open = false, $depth = 0 ) {
	printf( '<details class="nami-row"%s>', $open ? ' open' : '' );
	printf(
		'<summary><span class="nami-row__label">%s <span class="nami-row__num">%s</span>: <span class="nami-row__title">%s</span></span><span class="nami-row__actions"><button type="button" class="button-link nami-row__up" title="Move up">↑</button><button type="button" class="button-link nami-row__down" title="Move down">↓</button><button type="button" class="button-link nami-row__remove">Remove</button></span></summary>',
		esc_html( $field['item_label'] ?? 'Item' ),
		esc_html( $number > 0 ? (string) $number : '' ),
		esc_html( nami_cms_row_title( $field, $row ) )
	);
	echo '<div class="nami-row__body">';
	foreach ( $field['fields'] as $key => $sub ) {
		echo '<div class="nami-subfield">';
		printf( '<label class="nami-subfield__label" for="%s">%s</label>', esc_attr( nami_cms_field_id( $name . '[' . $index . '][' . $key . ']' ) ), esc_html( $sub['label'] ) );
		nami_cms_render_field( $sub, $name . '[' . $index . '][' . $key . ']', $row[ $key ] ?? ( $sub['default'] ?? null ), ( $field['title_field'] ?? '' ) === $key, $depth + 1 );
		echo '</div>';
	}
	echo '</div></details>';
}

/* ------------------------------------------------------------------
 * Sanitising
 * ------------------------------------------------------------------ */

function nami_cms_clean_url( $raw ) {
	if ( ! is_scalar( $raw ) ) {
		return '';
	}
	$url = trim( (string) $raw );
	if ( '' === $url ) {
		return '';
	}
	// Site-relative paths and #anchors are kept as typed.
	if ( ( 0 === strpos( $url, '/' ) && 0 !== strpos( $url, '//' ) ) || 0 === strpos( $url, '#' ) ) {
		return sanitize_text_field( $url );
	}
	return esc_url_raw( $url, array( 'http', 'https', 'mailto', 'tel' ) );
}

function nami_cms_sanitize_field( array $field, $raw ) {
	switch ( $field['type'] ) {
		case 'text':
			return is_scalar( $raw ) ? sanitize_text_field( (string) $raw ) : '';

		case 'textarea':
			return is_scalar( $raw ) ? sanitize_textarea_field( (string) $raw ) : '';

		case 'number':
			return is_numeric( $raw ) ? $raw + 0 : 0;

		case 'toggle':
			return ! empty( $raw ) && '0' !== $raw;

		case 'select':
			$options = array_map( 'strval', array_keys( $field['options'] ) );
			return in_array( (string) $raw, $options, true ) ? (string) $raw : ( $options[0] ?? '' );

		case 'url':
		case 'video':
		case 'file':
			return nami_cms_clean_url( $raw );

		case 'date':
			return is_scalar( $raw ) && preg_match( '/^\d{4}-\d{2}-\d{2}$/', (string) $raw ) ? (string) $raw : '';

		case 'link':
			$raw = is_array( $raw ) ? $raw : array();
			return array(
				'label' => sanitize_text_field( (string) ( $raw['label'] ?? '' ) ),
				'href'  => nami_cms_clean_url( $raw['href'] ?? '' ),
			);

		case 'image':
			$raw = is_array( $raw ) ? $raw : array();
			return array(
				'src'    => nami_cms_clean_url( $raw['src'] ?? '' ),
				'alt'    => sanitize_text_field( (string) ( $raw['alt'] ?? '' ) ),
				'width'  => absint( $raw['width'] ?? 0 ),
				'height' => absint( $raw['height'] ?? 0 ),
			);

		case 'lines':
			$lines = preg_split( '/\R/', is_scalar( $raw ) ? (string) $raw : '' );
			$lines = array_map( 'sanitize_text_field', $lines );
			return array_values( array_filter( $lines, 'strlen' ) );

		case 'paragraphs':
			$blocks = preg_split( '/\R\s*\R/', is_scalar( $raw ) ? trim( (string) $raw ) : '' );
			$blocks = array_map(
				function ( $block ) {
					return trim( preg_replace( '/\s*\R\s*/', ' ', sanitize_textarea_field( $block ) ) );
				},
				$blocks
			);
			return array_values( array_filter( $blocks, 'strlen' ) );

		case 'repeater':
			$rows = array();
			foreach ( is_array( $raw ) ? $raw : array() as $row ) {
				if ( ! is_array( $row ) ) {
					continue;
				}
				$clean = array();
				foreach ( $field['fields'] as $key => $sub ) {
					$clean[ $key ] = nami_cms_sanitize_field( $sub, $row[ $key ] ?? null );
				}
				$rows[] = $clean;
			}
			return $rows;
	}
	return null;
}

/* ------------------------------------------------------------------
 * Save / restore handlers
 * ------------------------------------------------------------------ */

function nami_cms_request_target() {
	$slug    = isset( $_POST['nami_page'] ) ? sanitize_key( wp_unslash( $_POST['nami_page'] ) ) : '';
	$section = isset( $_POST['nami_section'] ) ? sanitize_key( wp_unslash( $_POST['nami_section'] ) ) : '';
	$pages   = nami_cms_pages();
	if ( ! isset( $pages[ $slug ]['sections'][ $section ] ) ) {
		wp_die( 'Unknown page or section.', 400 );
	}
	return array( $slug, $section, $pages[ $slug ] );
}

function nami_cms_redirect_back( $slug, $section, array $page, $status, $sync ) {
	$first = array_key_first( $page['sections'] );
	wp_safe_redirect(
		add_query_arg(
			array(
				'page'        => nami_cms_screen_slug( $slug, $section, $first ),
				'nami_status' => $status,
				'nami_sync'   => $sync,
			),
			admin_url( 'admin.php' )
		)
	);
	exit;
}

add_action(
	'admin_post_nami_cms_save',
	function () {
		if ( ! current_user_can( NAMI_CMS_CAP ) ) {
			wp_die( 'You are not allowed to edit website content.', 403 );
		}
		list( $slug, $section_id, $page ) = nami_cms_request_target();
		check_admin_referer( 'nami_cms_save_' . $slug . '_' . $section_id );

		// PHP silently drops form fields past max_input_vars. The marker is the form's
		// last field, so if it is missing the save is incomplete: refuse it rather
		// than overwrite content with a cut-off list.
		if ( empty( $_POST['nami_complete'] ) ) {
			wp_die(
				esc_html(
					sprintf(
						'Nothing was saved. This section has more fields than the server accepts in one save (PHP max_input_vars is %s). Ask your hosting provider to raise max_input_vars to 5000, then save again.',
						ini_get( 'max_input_vars' )
					)
				),
				'Too many fields',
				array(
					'response'  => 400,
					'back_link' => true,
				)
			);
		}

		$raw   = isset( $_POST['nami'] ) && is_array( $_POST['nami'] ) ? wp_unslash( $_POST['nami'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- sanitised per field below.
		$clean = array();
		foreach ( $page['sections'][ $section_id ]['fields'] as $key => $field ) {
			$clean[ $key ] = nami_cms_sanitize_field( $field, $raw[ $key ] ?? null );
		}

		$saved                = get_option( nami_cms_option_name( $slug ), array() );
		$saved                = is_array( $saved ) ? $saved : array();
		$saved[ $section_id ] = $clean;
		update_option( nami_cms_option_name( $slug ), $saved, false );

		nami_cms_redirect_back( $slug, $section_id, $page, 'saved', nami_cms_notify_site( $slug ) );
	}
);

add_action(
	'admin_post_nami_cms_reset',
	function () {
		if ( ! current_user_can( NAMI_CMS_CAP ) ) {
			wp_die( 'You are not allowed to edit website content.', 403 );
		}
		list( $slug, $section_id, $page ) = nami_cms_request_target();
		check_admin_referer( 'nami_cms_reset_' . $slug . '_' . $section_id );

		$saved = get_option( nami_cms_option_name( $slug ), array() );
		$saved = is_array( $saved ) ? $saved : array();
		unset( $saved[ $section_id ] );
		update_option( nami_cms_option_name( $slug ), $saved, false );

		nami_cms_redirect_back( $slug, $section_id, $page, 'reset', nami_cms_notify_site( $slug ) );
	}
);

/* ------------------------------------------------------------------
 * Edit screen
 * ------------------------------------------------------------------ */

function nami_cms_render_notice() {
	$status = isset( $_GET['nami_status'] ) ? sanitize_key( $_GET['nami_status'] ) : '';
	if ( '' === $status ) {
		return;
	}
	$sync  = isset( $_GET['nami_sync'] ) ? sanitize_key( $_GET['nami_sync'] ) : '';
	$done  = 'reset' === $status ? 'Original content restored.' : 'Changes saved.';
	$class = 'notice-success';

	if ( 'ok' === $sync ) {
		$message = $done . ' The website has been updated.';
	} elseif ( 'failed' === $sync ) {
		$error   = get_transient( 'nami_cms_sync_error_' . get_current_user_id() );
		$message = $done . ' The website could not be notified (' . ( $error ? $error : 'unknown error' ) . '), so the change will appear within about 5 minutes.';
		$class   = 'notice-warning';
	} else {
		$message = $done . ' Connect the website under Settings → NAMI CMS to publish changes instantly; until then they appear within about 5 minutes.';
		$class   = 'notice-warning';
	}
	printf( '<div class="notice %s is-dismissible"><p>%s</p></div>', esc_attr( $class ), esc_html( $message ) );
}

function nami_cms_render_screen() {
	$target = nami_cms_current_screen();
	if ( null === $target ) {
		echo '<div class="wrap"><p>Unknown page.</p></div>';
		return;
	}
	list( $slug, $section_id ) = $target;
	$page    = nami_cms_pages()[ $slug ];
	$section = $page['sections'][ $section_id ];
	$values  = nami_cms_get_values( $slug )[ $section_id ];
	$site    = nami_cms_settings()['site_url'];

	echo '<div class="wrap nami-cms">';
	printf( '<h1>%s <span class="nami-cms__crumb">› %s</span></h1>', esc_html( $page['title'] ), esc_html( $section['title'] ) );
	if ( '' !== $site && isset( $page['path'] ) ) {
		printf(
			'<p><a href="%s" target="_blank" rel="noopener">View this section on the website ↗</a></p>',
			esc_url( untrailingslashit( $site ) . $page['path'] . ( isset( $section['anchor'] ) ? '#' . $section['anchor'] : '' ) )
		);
	}
	nami_cms_render_notice();
	if ( ! empty( $section['description'] ) ) {
		printf( '<p class="nami-cms__intro">%s</p>', esc_html( $section['description'] ) );
	}

	echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '" class="nami-cms__form">';
	echo '<input type="hidden" name="action" value="nami_cms_save">';
	printf( '<input type="hidden" name="nami_page" value="%s">', esc_attr( $slug ) );
	printf( '<input type="hidden" name="nami_section" value="%s">', esc_attr( $section_id ) );
	wp_nonce_field( 'nami_cms_save_' . $slug . '_' . $section_id );

	echo '<table class="form-table" role="presentation"><tbody>';
	foreach ( $section['fields'] as $key => $field ) {
		$name = 'nami[' . $key . ']';
		echo '<tr><th scope="row">';
		printf( '<label for="%s">%s</label>', esc_attr( nami_cms_field_id( $name ) ), esc_html( $field['label'] ) );
		echo '</th><td>';
		nami_cms_render_field( $field, $name, $values[ $key ] ?? null );
		echo '</td></tr>';
	}
	echo '</tbody></table>';
	// Must stay the last field before the button; see the max_input_vars check on save.
	echo '<input type="hidden" name="nami_complete" value="1">';
	submit_button( 'Save changes' );
	echo '</form>';

	echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '" class="nami-cms__reset" onsubmit="return window.confirm(\'Restore the original content of this section? Your edits here will be lost.\');">';
	echo '<input type="hidden" name="action" value="nami_cms_reset">';
	printf( '<input type="hidden" name="nami_page" value="%s">', esc_attr( $slug ) );
	printf( '<input type="hidden" name="nami_section" value="%s">', esc_attr( $section_id ) );
	wp_nonce_field( 'nami_cms_reset_' . $slug . '_' . $section_id );
	echo '<button type="submit" class="button-link nami-cms__reset-btn">Restore original content for this section</button>';
	echo '</form></div>';
}

/* ------------------------------------------------------------------
 * Settings screen (Settings → NAMI CMS)
 * ------------------------------------------------------------------ */

add_action(
	'admin_post_nami_cms_settings',
	function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'You are not allowed to change these settings.', 403 );
		}
		check_admin_referer( 'nami_cms_settings' );
		update_option(
			'nami_cms_settings',
			array(
				'site_url' => esc_url_raw( trim( wp_unslash( $_POST['site_url'] ?? '' ) ), array( 'http', 'https' ) ),
				'secret'   => sanitize_text_field( wp_unslash( $_POST['secret'] ?? '' ) ),
			),
			false
		);
		$sync = nami_cms_notify_site( 'connection-test' );
		wp_safe_redirect( add_query_arg( array( 'page' => 'nami-cms-settings', 'nami_status' => 'settings', 'nami_sync' => $sync ), admin_url( 'options-general.php' ) ) );
		exit;
	}
);

function nami_cms_render_settings() {
	$settings = nami_cms_settings();
	$secret   = '' !== $settings['secret'] ? $settings['secret'] : wp_generate_password( 40, false );
	$locked   = defined( 'NAMI_SITE_URL' ) || defined( 'NAMI_REVALIDATE_SECRET' );

	echo '<div class="wrap"><h1>NAMI CMS — Website connection</h1>';
	if ( isset( $_GET['nami_status'] ) ) {
		$sync = isset( $_GET['nami_sync'] ) ? sanitize_key( $_GET['nami_sync'] ) : '';
		if ( 'ok' === $sync ) {
			echo '<div class="notice notice-success"><p>Saved. Connection to the website works.</p></div>';
		} elseif ( 'failed' === $sync ) {
			$error = get_transient( 'nami_cms_sync_error_' . get_current_user_id() );
			printf( '<div class="notice notice-error"><p>Saved, but the website did not accept the test (%s). Check the URL and that CMS_REVALIDATE_SECRET on the website matches.</p></div>', esc_html( $error ? $error : 'unknown error' ) );
		} else {
			echo '<div class="notice notice-warning"><p>Saved. Fill in both fields to enable instant updates.</p></div>';
		}
	}
	if ( $locked ) {
		echo '<div class="notice notice-info"><p>Some values are set in wp-config.php and override this form.</p></div>';
	}
	echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
	echo '<input type="hidden" name="action" value="nami_cms_settings">';
	wp_nonce_field( 'nami_cms_settings' );
	echo '<table class="form-table" role="presentation"><tbody>';
	printf( '<tr><th scope="row"><label for="nami-site-url">Website URL</label></th><td><input type="url" class="regular-text" id="nami-site-url" name="site_url" value="%s" placeholder="https://www.nami.edu.np"><p class="description">The live Next.js website. Used for instant updates and image previews.</p></td></tr>', esc_attr( $settings['site_url'] ) );
	printf( '<tr><th scope="row"><label for="nami-secret">Shared secret</label></th><td><input type="text" class="regular-text code" id="nami-secret" name="secret" value="%s" autocomplete="off"><p class="description">Set the same value as <code>CMS_REVALIDATE_SECRET</code> in the website\'s environment.</p></td></tr>', esc_attr( $secret ) );
	echo '</tbody></table>';
	submit_button( 'Save & test connection' );
	echo '</form>';
	printf( '<p>Content API: <code>%s</code></p></div>', esc_html( rest_url( 'nami/v1/pages/home' ) ) );
}

/* ------------------------------------------------------------------
 * Admin assets (only on NAMI CMS screens)
 * ------------------------------------------------------------------ */

/** NAMI CMS section screens and the edit screens of NAMI collections (notices, vacancies…). */
function nami_cms_is_cms_screen() {
	if ( null !== nami_cms_current_screen() ) {
		return true;
	}
	$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
	return $screen && 'post' === $screen->base && null !== nami_cms_collection_by_type( $screen->post_type );
}

add_action(
	'admin_enqueue_scripts',
	function () {
		if ( nami_cms_is_cms_screen() ) {
			wp_enqueue_media();
		}
	}
);

add_action(
	'admin_head',
	function () {
		if ( ! nami_cms_is_cms_screen() ) {
			return;
		}
		?>
		<style>
			.nami-cms__crumb { color: #646970; font-weight: 400; }
			.nami-cms__intro { max-width: 760px; font-size: 14px; }
			.nami-cms .form-table th { width: 220px; }
			.nami-link { display: flex; flex-wrap: wrap; gap: 12px; }
			.nami-link label, .nami-image__meta label { display: flex; flex-direction: column; gap: 4px; font-weight: 600; }
			.nami-image { display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; max-width: 900px; }
			.nami-image__preview { width: 220px; aspect-ratio: 16/10; background: #f0f0f1; border: 1px solid #dcdcde; border-radius: 6px; display: flex; align-items: center; justify-content: center; overflow: hidden; text-align: center; color: #646970; font-size: 12px; padding: 4px; box-sizing: border-box; }
			.nami-image__preview img { max-width: 100%; max-height: 100%; object-fit: contain; }
			.nami-image__meta { flex: 1; min-width: 260px; }
			.nami-image__meta p { margin: 0 0 8px; }
			.nami-image__path { word-break: break-all; }
			.nami-repeater { max-width: 980px; }
			.nami-row { background: #fff; border: 1px solid #c3c4c7; border-radius: 6px; margin-bottom: 8px; }
			.nami-row > summary { cursor: pointer; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; gap: 12px; font-weight: 600; }
			.nami-row[open] > summary { border-bottom: 1px solid #dcdcde; }
			.nami-row__title { font-weight: 400; color: #50575e; }
			.nami-row__actions { display: flex; gap: 10px; white-space: nowrap; }
			.nami-row__remove { color: #b32d2e !important; }
			.nami-row__body { padding: 12px 14px; }
			.nami-row .nami-row { background: #f6f7f7; }
			.nami-subfield { margin-bottom: 14px; }
			.nami-subfield__label { display: block; font-weight: 600; margin-bottom: 4px; }
			.nami-cms__reset { margin-top: 8px; }
			.nami-cms__reset-btn { color: #b32d2e !important; }
		</style>
		<?php
	}
);

add_action(
	'admin_footer',
	function () {
		if ( ! nami_cms_is_cms_screen() ) {
			return;
		}
		?>
		<script>
		(function () {
			// :scope keeps nested lists from matching their parent list's parts.
			function rowsOf(repeater) { return repeater.querySelector(':scope > .nami-repeater__rows'); }

			function renumber(repeater) {
				Array.prototype.forEach.call(rowsOf(repeater).children, function (row, i) {
					var num = row.querySelector('.nami-row__num');
					if (num) num.textContent = String(i + 1);
				});
			}

			function setImage(box, src, alt, width, height) {
				box.querySelector('.nami-image__src').value = src;
				box.querySelector('.nami-image__width').value = width || 0;
				box.querySelector('.nami-image__height').value = height || 0;
				var altInput = box.querySelector('.nami-image__alt');
				if (alt && !altInput.value) {
					altInput.value = alt;
					altInput.dispatchEvent(new Event('input', { bubbles: true }));
				}
				box.querySelector('.nami-image__path').textContent = src;
				var preview = box.querySelector('.nami-image__preview');
				preview.innerHTML = '';
				if (src) {
					var img = document.createElement('img');
					img.src = src;
					img.alt = '';
					preview.appendChild(img);
				} else {
					var span = document.createElement('span');
					span.textContent = 'No image selected';
					preview.appendChild(span);
				}
			}

			function pick(button) {
				var kind = button.getAttribute('data-kind');
				var frame = wp.media({
					title: kind === 'image' ? 'Choose an image' : 'Choose a ' + kind,
					library: kind === 'file' ? {} : { type: kind },
					button: { text: kind === 'image' ? 'Use this image' : 'Use this ' + kind },
					multiple: false
				});
				frame.on('select', function () {
					var file = frame.state().get('selection').first().toJSON();
					if (kind === 'video' || kind === 'file') {
						button.closest('.nami-video, .nami-file').querySelector('input').value = file.url;
					} else {
						setImage(button.closest('.nami-image'), file.url, file.alt || file.title || '', file.width, file.height);
					}
				});
				frame.open();
			}

			document.addEventListener('click', function (event) {
				var button = event.target.closest('button');
				if (!button || !button.closest('.nami-cms')) return;
				var row = button.closest('.nami-row');
				var repeater = button.closest('.nami-repeater');

				if (button.classList.contains('nami-pick')) {
					event.preventDefault();
					pick(button);
				} else if (button.classList.contains('nami-image__clear')) {
					event.preventDefault();
					setImage(button.closest('.nami-image'), '', '', 0, 0);
				} else if (button.classList.contains('nami-repeater__add')) {
					event.preventDefault();
					var index = parseInt(repeater.getAttribute('data-next-index'), 10) || 0;
					repeater.setAttribute('data-next-index', String(index + 1));
					var placeholder = repeater.getAttribute('data-placeholder') || '__i0__';
					var html = repeater.querySelector(':scope > template.nami-repeater__template').innerHTML.split(placeholder).join(String(index));
					rowsOf(repeater).insertAdjacentHTML('beforeend', html);
					renumber(repeater);
					var first = rowsOf(repeater).lastElementChild.querySelector('input:not([type=hidden]), textarea');
					if (first) first.focus();
				} else if (button.classList.contains('nami-row__up')) {
					event.preventDefault();
					if (row.previousElementSibling) row.parentNode.insertBefore(row, row.previousElementSibling);
					renumber(repeater);
				} else if (button.classList.contains('nami-row__down')) {
					event.preventDefault();
					if (row.nextElementSibling) row.parentNode.insertBefore(row.nextElementSibling, row);
					renumber(repeater);
				} else if (button.classList.contains('nami-row__remove')) {
					event.preventDefault();
					if (window.confirm('Remove this item? (It is only deleted when you click "Save changes".)')) {
						row.remove();
						renumber(repeater);
					}
				}
			});

			// Keep each collapsed row's summary in sync with its title field.
			document.addEventListener('input', function (event) {
				if (!event.target.hasAttribute('data-row-title')) return;
				var row = event.target.closest('.nami-row');
				var title = row && row.querySelector('.nami-row__title');
				if (title) title.textContent = event.target.value;
			});
		})();
		</script>
		<?php
	}
);

/* ------------------------------------------------------------------
 * Collections: lists where editors add items one by one
 * ------------------------------------------------------------------
 *
 * A snippet registers one through the `nami_cms_collections` filter:
 *
 *   $collections['notice-items'] = array(
 *       'post_type'   => 'nami_notice',
 *       'singular'    => 'Notice',
 *       'plural'      => 'Notices',
 *       'menu_name'   => 'Notices',     // optional, defaults to 'plural'
 *       'icon'        => 'dashicons-megaphone',
 *       'position'    => 3.7,
 *       'title_label' => 'Notice title',
 *       'description' => 'Shown above the fields.',
 *       'fields'      => array( …same field types as page sections… ),
 *       'columns'     => array( 'kind', 'institution' ), // fields shown in the list
 *       'ready'       => false, // false: the website keeps its bundled items until
 *                               // an editor imports them or starts an empty list
 *       'import'      => array( array( 'title' => …, 'date' => 'Y-m-d', 'fields' => array( … ) ) ),
 *   );
 *
 * Each item is a non-public post of 'post_type' with its fields in the
 * '_nami_fields' meta. The post's publish date is the item's date, so items
 * can also be scheduled.
 */

function nami_cms_collections() {
	static $cache = null;
	if ( null !== $cache ) {
		return $cache;
	}
	$collections = apply_filters( 'nami_cms_collections', array() );
	$collections = is_array( $collections ) ? $collections : array();
	if ( did_action( 'init' ) ) {
		$cache = $collections;
	}
	return $collections;
}

/** array( slug, config ) for a collection's post type, or null. */
function nami_cms_collection_by_type( $post_type ) {
	foreach ( nami_cms_collections() as $slug => $config ) {
		if ( ( $config['post_type'] ?? '' ) === $post_type ) {
			return array( $slug, $config );
		}
	}
	return null;
}

function nami_cms_collection_ready( $slug, array $config ) {
	return ! empty( $config['ready'] ) || (bool) get_option( 'nami_cms_collection_ready_' . $slug );
}

function nami_cms_collection_fields( $post_id, array $config ) {
	$saved  = get_post_meta( $post_id, '_nami_fields', true );
	$saved  = is_array( $saved ) ? $saved : array();
	$values = array();
	foreach ( $config['fields'] as $key => $field ) {
		$values[ $key ] = array_key_exists( $key, $saved ) ? $saved[ $key ] : ( $field['default'] ?? null );
	}
	return $values;
}

function nami_cms_collection_clean( array $config, array $raw ) {
	$clean = array();
	foreach ( $config['fields'] as $key => $field ) {
		$clean[ $key ] = nami_cms_sanitize_field( $field, $raw[ $key ] ?? null );
	}
	return $clean;
}

add_action(
	'init',
	function () {
		foreach ( nami_cms_collections() as $slug => $config ) {
			$one  = $config['singular'];
			$many = $config['plural'];
			register_post_type(
				$config['post_type'],
				array(
					'labels'          => array(
						'name'               => $many,
						'singular_name'      => $one,
						'menu_name'          => $config['menu_name'] ?? $many,
						'all_items'          => 'All ' . $many,
						'add_new'            => 'Add New',
						'add_new_item'       => 'Add New ' . $one,
						'edit_item'          => 'Edit ' . $one,
						'new_item'           => 'New ' . $one,
						'search_items'       => 'Search ' . $many,
						'not_found'          => 'No ' . strtolower( $many ) . ' yet.',
						'not_found_in_trash' => 'No ' . strtolower( $many ) . ' in the trash.',
					),
					'public'          => false,
					'show_ui'         => true,
					'show_in_menu'    => true,
					'show_in_rest'    => false,
					'menu_position'   => $config['position'] ?? 4,
					'menu_icon'       => $config['icon'] ?? 'dashicons-list-view',
					'supports'        => array( 'title' ),
					'capability_type' => 'page',
					'map_meta_cap'    => true,
					'rewrite'         => false,
					'query_var'       => false,
				)
			);

			$type = $config['post_type'];

			add_action(
				'add_meta_boxes_' . $type,
				function () use ( $slug, $config, $type ) {
					add_meta_box(
						'nami_cms_fields',
						$config['singular'] . ' details',
						function ( $post ) use ( $slug, $config ) {
							wp_nonce_field( 'nami_cms_collection_' . $slug, 'nami_cms_collection_nonce' );
							echo '<div class="nami-cms">';
							if ( ! empty( $config['description'] ) ) {
								printf( '<p class="nami-cms__intro">%s</p>', esc_html( $config['description'] ) );
							}
							echo '<table class="form-table" role="presentation"><tbody>';
							foreach ( nami_cms_collection_fields( $post->ID, $config ) as $key => $value ) {
								$field = $config['fields'][ $key ];
								$name  = 'nami[' . $key . ']';
								printf( '<tr><th scope="row"><label for="%s">%s</label></th><td>', esc_attr( nami_cms_field_id( $name ) ), esc_html( $field['label'] ) );
								nami_cms_render_field( $field, $name, $value );
								echo '</td></tr>';
							}
							echo '</tbody></table>';
							echo '<p class="description">The date shown on the website is the <strong>Publish</strong> date in the box on the right. Choose a future date to schedule it.</p>';
							echo '</div>';
						},
						$type,
						'normal',
						'high'
					);
				}
			);

			add_filter(
				'enter_title_here',
				function ( $text, $post ) use ( $config, $type ) {
					return $post->post_type === $type ? ( $config['title_label'] ?? 'Title' ) : $text;
				},
				10,
				2
			);

			// Save the fields.
			add_action(
				'save_post_' . $type,
				function ( $post_id ) use ( $slug, $config ) {
					if ( ! isset( $_POST['nami_cms_collection_nonce'] ) || ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST['nami_cms_collection_nonce'] ) ), 'nami_cms_collection_' . $slug ) ) {
						return;
					}
					if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || wp_is_post_revision( $post_id ) || ! current_user_can( 'edit_post', $post_id ) ) {
						return;
					}
					$raw = isset( $_POST['nami'] ) && is_array( $_POST['nami'] ) ? wp_unslash( $_POST['nami'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- sanitised per field.
					update_post_meta( $post_id, '_nami_fields', wp_slash( nami_cms_collection_clean( $config, $raw ) ) );
				}
			);

			// Refresh the website after any change (also when a scheduled item goes live).
			$notify = function ( $post_id, $post = null ) use ( $slug, $type ) {
				$post = $post instanceof WP_Post ? $post : get_post( $post_id );
				if ( ! $post || $post->post_type !== $type || wp_is_post_revision( $post_id ) || 'auto-draft' === $post->post_status ) {
					return;
				}
				// Bulk actions set this and refresh the website once at the end.
				if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! empty( $GLOBALS['nami_cms_quiet'] ) ) {
					return;
				}
				nami_cms_notify_site( $slug );
			};
			add_action( 'save_post_' . $type, $notify, 99, 2 );
			add_action( 'trashed_post', $notify );
			add_action( 'untrashed_post', $notify );
			add_action( 'deleted_post', $notify, 10, 2 );

			// Extra list columns.
			add_filter(
				'manage_' . $type . '_posts_columns',
				function ( $columns ) use ( $config ) {
					$out = array();
					foreach ( $columns as $key => $label ) {
						$out[ $key ] = $label;
						if ( 'title' === $key ) {
							foreach ( $config['columns'] ?? array() as $field_key ) {
								$out[ 'nami_' . $field_key ] = $config['fields'][ $field_key ]['label'] ?? $field_key;
							}
						}
					}
					return $out;
				}
			);
			add_action(
				'manage_' . $type . '_posts_custom_column',
				function ( $column, $post_id ) use ( $config ) {
					if ( 0 !== strpos( $column, 'nami_' ) ) {
						return;
					}
					$key    = substr( $column, 5 );
					$field  = $config['fields'][ $key ] ?? null;
					$values = nami_cms_collection_fields( $post_id, $config );
					$value  = $values[ $key ] ?? '';
					if ( $field && 'select' === $field['type'] ) {
						$value = $field['options'][ (string) $value ] ?? $value;
					}
					echo esc_html( is_scalar( $value ) ? (string) $value : '' );
				},
				10,
				2
			);
		}
	}
);

// Until a collection is "ready", the website shows the items it was built with.
add_action(
	'admin_notices',
	function () {
		$screen = get_current_screen();
		if ( ! $screen || 'edit' !== $screen->base ) {
			return;
		}
		$match = nami_cms_collection_by_type( $screen->post_type );
		if ( null === $match ) {
			return;
		}
		list( $slug, $config ) = $match;

		if ( isset( $_GET['nami_started'] ) ) {
			$count = absint( $_GET['nami_started'] );
			printf(
				'<div class="notice notice-success is-dismissible"><p>%s</p></div>',
				esc_html( $count > 0 ? sprintf( '%d %s imported. The website now shows the %s listed here.', $count, strtolower( $count > 1 ? $config['plural'] : $config['singular'] ), strtolower( $config['plural'] ) ) : sprintf( 'The website now shows the %s listed here.', strtolower( $config['plural'] ) ) )
			);
		}
		if ( nami_cms_collection_ready( $slug, $config ) ) {
			return;
		}

		$button = function ( $mode, $label, $class, $confirm ) use ( $slug ) {
			return sprintf(
				'<a class="button %s" href="%s" onclick="return window.confirm(%s);">%s</a>',
				esc_attr( $class ),
				esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=nami_cms_collection_start&collection=' . $slug . '&mode=' . $mode ), 'nami_cms_collection_start_' . $slug ) ),
				esc_attr( wp_json_encode( $confirm ) ),
				esc_html( $label )
			);
		};
		$imports = count( $config['import'] ?? array() );
		$many    = strtolower( $config['plural'] );
		echo '<div class="notice notice-info"><p><strong>The website still shows the ' . esc_html( $many ) . ' it was built with.</strong> ';
		echo esc_html( 'Anything you add here appears next to them. Import them to edit or remove them here; after that, the website shows only this list.' ) . '</p><p>';
		if ( $imports > 0 ) {
			echo $button( 'import', sprintf( 'Import the %d existing %s', $imports, $many ), 'button-primary', sprintf( 'Copy the %d %s from the website into this list?', $imports, $many ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in $button.
			echo ' ';
		}
		echo $button( 'empty', 'Start with only this list', '', sprintf( 'The website will stop showing its built-in %s and show only the ones listed here. Continue?', $many ) ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in $button.
		echo '</p></div>';
	}
);

add_action(
	'admin_post_nami_cms_collection_start',
	function () {
		$slug        = isset( $_GET['collection'] ) ? sanitize_key( wp_unslash( $_GET['collection'] ) ) : '';
		$collections = nami_cms_collections();
		if ( ! isset( $collections[ $slug ] ) ) {
			wp_die( 'Unknown list.', 400 );
		}
		check_admin_referer( 'nami_cms_collection_start_' . $slug );
		if ( ! current_user_can( NAMI_CMS_CAP ) ) {
			wp_die( 'You are not allowed to change this list.', 403 );
		}
		$config = $collections[ $slug ];
		$count  = 0;

		$GLOBALS['nami_cms_quiet'] = true;
		if ( 'import' === ( $_GET['mode'] ?? '' ) && ! nami_cms_collection_ready( $slug, $config ) ) {
			foreach ( $config['import'] ?? array() as $item ) {
				$date    = preg_match( '/^\d{4}-\d{2}-\d{2}$/', (string) ( $item['date'] ?? '' ) ) ? $item['date'] : current_time( 'Y-m-d' );
				$post_id = wp_insert_post(
					array(
						'post_type'   => $config['post_type'],
						'post_status' => 'publish',
						'post_title'  => sanitize_text_field( (string) ( $item['title'] ?? '' ) ),
						'post_date'   => $date . ' 09:00:00',
					),
					true
				);
				if ( is_wp_error( $post_id ) ) {
					continue;
				}
				update_post_meta( $post_id, '_nami_fields', wp_slash( nami_cms_collection_clean( $config, is_array( $item['fields'] ?? null ) ? $item['fields'] : array() ) ) );
				++$count;
			}
		}

		update_option( 'nami_cms_collection_ready_' . $slug, true, false );
		$GLOBALS['nami_cms_quiet'] = false;
		nami_cms_notify_site( $slug );
		wp_safe_redirect( admin_url( 'edit.php?post_type=' . $config['post_type'] . '&nami_started=' . $count ) );
		exit;
	}
);

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'nami/v1',
			'/collections/(?P<slug>[a-z0-9-]+)',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => function ( WP_REST_Request $request ) {
					$slug        = (string) $request['slug'];
					$collections = nami_cms_collections();
					if ( ! isset( $collections[ $slug ] ) ) {
						return new WP_Error( 'nami_cms_not_found', 'Unknown list.', array( 'status' => 404 ) );
					}
					$config = $collections[ $slug ];
					$posts  = get_posts(
						array(
							'post_type'      => $config['post_type'],
							'post_status'    => 'publish',
							'posts_per_page' => 500,
							'orderby'        => 'date',
							'order'          => 'DESC',
						)
					);
					$items = array();
					foreach ( $posts as $post ) {
						$items[] = array(
							'id'     => $post->ID,
							'slug'   => $post->post_name,
							'title'  => wp_specialchars_decode( $post->post_title, ENT_QUOTES ),
							'date'   => get_the_date( 'Y-m-d', $post ),
							'fields' => nami_cms_collection_fields( $post->ID, $config ),
						);
					}
					$response = rest_ensure_response(
						array(
							'ready' => nami_cms_collection_ready( $slug, $config ),
							'items' => $items,
						)
					);
					$response->header( 'Cache-Control', 'no-store' );
					return $response;
				},
			)
		);
	}
);
