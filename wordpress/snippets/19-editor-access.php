<?php
/**
 * NAMI CMS — Editor access
 *
 * For every logged-in user who is NOT an Administrator (Editors and any other
 * role), the WordPress admin shows only the website menus created by the NAMI
 * CMS snippets, plus Media (for uploading photos and files) and Profile (to
 * change their password). Everything else — Posts, Pages, Comments,
 * Appearance, Plugins, Snippets, Users, Tools, Settings, and menus added by
 * other plugins — is hidden, and opening those screens by their address sends
 * the user back to the Dashboard. The Dashboard itself becomes a single
 * "Edit the website" box with links to every section.
 *
 * Administrators are not affected. Works with or without the other snippets;
 * paste it as its own snippet, "Run snippet everywhere".
 */

if ( ! defined( 'ABSPATH' ) || defined( 'NAMI_EDITOR_ACCESS' ) ) {
	return;
}
define( 'NAMI_EDITOR_ACCESS', '1.0.0' );

/** True for logged-in users who are not Administrators. */
function nami_access_restricted() {
	return is_user_logged_in() && ! current_user_can( 'manage_options' );
}

/** Menus restricted users keep: the NAMI CMS menus, Dashboard, Media and Profile. */
function nami_access_menu_allowed( $slug ) {
	$slug = (string) $slug;
	return in_array( $slug, array( 'index.php', 'upload.php', 'profile.php' ), true )
		|| 0 === strpos( $slug, 'nami-' )
		|| 0 === strpos( $slug, 'edit.php?post_type=nami_' );
}

/* ------------------------------------------------------------------
 * Sidebar menu
 * ------------------------------------------------------------------ */

add_action(
	'admin_menu',
	function () {
		global $menu, $submenu;
		if ( ! nami_access_restricted() || ! is_array( $menu ) ) {
			return;
		}
		foreach ( $menu as $index => $item ) {
			$slug = (string) ( $item[2] ?? '' );
			// Separators and everything not on the allow list.
			if ( 0 === strpos( $slug, 'separator' ) || ! nami_access_menu_allowed( $slug ) ) {
				unset( $menu[ $index ] );
			}
		}
		// Dashboard → Updates is for administrators.
		if ( isset( $submenu['index.php'] ) ) {
			foreach ( $submenu['index.php'] as $index => $item ) {
				if ( 'index.php' !== ( $item[2] ?? '' ) ) {
					unset( $submenu['index.php'][ $index ] );
				}
			}
		}
	},
	PHP_INT_MAX
);

/* ------------------------------------------------------------------
 * Hidden screens stay hidden when opened by their address
 * ------------------------------------------------------------------ */

add_action(
	'current_screen',
	function ( $screen ) {
		if ( ! nami_access_restricted() || ! $screen ) {
			return;
		}
		$post_type = (string) $screen->post_type;
		$page      = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';

		$allowed = in_array( $screen->base, array( 'dashboard', 'profile', 'upload', 'media' ), true )
			|| ( '' !== $page && 0 === strpos( $page, 'nami-' ) )
			|| ( in_array( $screen->base, array( 'edit', 'post' ), true ) && 0 === strpos( $post_type, 'nami_' ) )
			|| ( 'post' === $screen->base && 'attachment' === $post_type );

		if ( ! $allowed ) {
			wp_safe_redirect( add_query_arg( 'nami_denied', '1', admin_url( 'index.php' ) ) );
			exit;
		}
	}
);

add_action(
	'admin_notices',
	function () {
		if ( nami_access_restricted() && isset( $_GET['nami_denied'] ) ) {
			echo '<div class="notice notice-info is-dismissible"><p>That part of WordPress is only available to administrators. Use the menus on the left to edit the website.</p></div>';
		}
	}
);

/* ------------------------------------------------------------------
 * Top bar
 * ------------------------------------------------------------------ */

add_action(
	'admin_bar_menu',
	function ( $bar ) {
		if ( ! nami_access_restricted() ) {
			return;
		}
		$keep_top    = array( 'site-name', 'nami-cms', 'my-account', 'menu-toggle' );
		$keep_inside = array( 'view-site', 'dashboard' );
		foreach ( $bar->get_nodes() as $node ) {
			if ( ! empty( $node->group ) ) {
				continue;
			}
			$parent = (string) $node->parent;
			if ( ( '' === $parent || 'top-secondary' === $parent || 'root-default' === $parent ) && ! in_array( $node->id, $keep_top, true ) ) {
				$bar->remove_node( $node->id );
			} elseif ( in_array( $parent, array( 'site-name', 'appearance' ), true ) && ! in_array( $node->id, $keep_inside, true ) ) {
				$bar->remove_node( $node->id );
			}
		}
	},
	PHP_INT_MAX
);

/* ------------------------------------------------------------------
 * Dashboard: one "Edit the website" box
 * ------------------------------------------------------------------ */

add_action(
	'wp_dashboard_setup',
	function () {
		global $wp_meta_boxes;
		if ( ! nami_access_restricted() ) {
			return;
		}
		remove_action( 'welcome_panel', 'wp_welcome_panel' );
		$wp_meta_boxes['dashboard'] = array();
		wp_add_dashboard_widget( 'nami_access_sections', 'Edit the website', 'nami_access_render_sections' );
	},
	PHP_INT_MAX
);

function nami_access_render_sections() {
	global $menu;
	$links = array();
	foreach ( is_array( $menu ) ? $menu : array() as $item ) {
		$slug = (string) ( $item[2] ?? '' );
		if ( ! nami_access_menu_allowed( $slug ) || in_array( $slug, array( 'index.php', 'upload.php', 'profile.php' ), true ) ) {
			continue;
		}
		$url     = false !== strpos( $slug, '.php' ) ? admin_url( $slug ) : admin_url( 'admin.php?page=' . $slug );
		$links[] = sprintf( '<li><a class="button" style="width:100%%;text-align:left" href="%s">%s</a></li>', esc_url( $url ), esc_html( trim( wp_strip_all_tags( (string) $item[0] ) ) ) );
	}
	echo '<p>Choose a part of the website to edit. Changes appear on the website as soon as you save.</p>';
	echo '<ul style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;margin:12px 0 0">' . implode( '', $links ) . '</ul>'; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above.
	printf( '<p style="margin-top:14px"><a href="%s">Media Library</a> · <a href="%s">Your profile and password</a></p>', esc_url( admin_url( 'upload.php' ) ), esc_url( admin_url( 'profile.php' ) ) );
}
