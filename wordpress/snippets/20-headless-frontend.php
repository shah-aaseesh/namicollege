<?php
/**
 * NAMI CMS — Hide the WordPress front end
 *
 * This WordPress is only the content backend for the Next.js website, so its
 * own public pages are not needed. This snippet:
 *   - redirects every public page (home, posts, author pages, feeds …) to the
 *     real website: the "Website URL" under Settings → NAMI CMS, or
 *     https://nami.edu.np until that is set,
 *   - serves a robots.txt that disallows everything and sends "noindex"
 *     headers, so search engines leave this address alone,
 *   - turns off WordPress's own sitemap,
 *   - hides the public list of WordPress usernames (/wp/v2/users) from
 *     visitors who are not logged in.
 *
 * Not affected: wp-admin, the login page, uploaded files (/wp-content/uploads),
 * and the REST addresses the website reads (/?rest_route=/nami/v1/…).
 * Paste as its own snippet, "Run snippet everywhere".
 */

if ( ! defined( 'ABSPATH' ) || defined( 'NAMI_HEADLESS' ) ) {
	return;
}
define( 'NAMI_HEADLESS', '1.0.0' );

/** The public website: Settings → NAMI CMS → Website URL, or the main domain. */
function nami_headless_target() {
	$site = function_exists( 'nami_cms_settings' ) ? (string) nami_cms_settings()['site_url'] : '';
	return '' !== $site ? untrailingslashit( $site ) : 'https://nami.edu.np';
}

// Runs before WordPress picks a template (and before its own canonical
// redirects, which would otherwise reveal usernames via ?author=1).
add_action(
	'template_redirect',
	function () {
		if ( is_robots() ) {
			return;
		}
		wp_redirect( nami_headless_target() . '/', 302, 'NAMI CMS' );
		exit;
	},
	0
);

add_filter(
	'robots_txt',
	function () {
		return "User-agent: *\nDisallow: /\n";
	},
	PHP_INT_MAX
);

add_action(
	'send_headers',
	function () {
		header( 'X-Robots-Tag: noindex, nofollow', true );
	}
);
add_action(
	'login_init',
	function () {
		header( 'X-Robots-Tag: noindex, nofollow', true );
	}
);

add_filter( 'wp_sitemaps_enabled', '__return_false' );

// Logged-in staff (with a valid REST nonce) still get the user list in wp-admin.
add_filter(
	'rest_endpoints',
	function ( $endpoints ) {
		if ( is_user_logged_in() ) {
			return $endpoints;
		}
		foreach ( array_keys( $endpoints ) as $route ) {
			if ( 0 === strpos( $route, '/wp/v2/users' ) ) {
				unset( $endpoints[ $route ] );
			}
		}
		return $endpoints;
	}
);
