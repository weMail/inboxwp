<?php

function inboxwp_generate_hash( $length = 40 ) {
    if ( 0 >= $length ) {
		$length = 40; // Min key length.
    }
    if ( 255 <= $length ) {
		$length = 255; // Max key length.
    }

    $characters   = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $random_string = '';
    for ( $i = 0; $i < $length; $i++ ) {
        $random_string .= $characters[ wp_rand( 0, strlen( $characters ) - 1 ) ];
    }

    return $random_string;
}

/**
 * Fetch api api key
 *
 * @return mixed
 */
function inboxwp_api_key() {
    return get_option( 'inbox_wp_app_key' );
}

/**
 * Fetch site hash key
 *
 * @return mixed
 */
function inboxwp_site_hash() {
    return get_option( 'inbox_wp_site_hash' );
}

/**
 * Update site hash
 *
 * @param string $hash
 * @return mixed
 */
function inboxwp_set_site_hash( $hash = '' ) {
    if ( $hash ) {
        update_option( 'inbox_wp_site_hash', $hash );
    } else {
        update_option( 'inbox_wp_site_hash', inboxwp_generate_hash() );
    }
}

/**
 * Verifies that a value is boolean true or false
 *
 * @param $var
 * @return mixed
 */
function inboxwp_validate_boolean( $var ) {
    return filter_var( $var, FILTER_VALIDATE_BOOLEAN );
}

/**
 * Parse domain from a url
 *
 * @param $url
 * @return array|false|int|string|null
 */
function inboxwp_parse_domain( $url ) {
    return parse_url( $url, PHP_URL_HOST );
}

/**
 * Get the inboxwp admin page url
 *
 * @return mixed
 */
function inboxwp_get_admin_url() {
    return admin_url( 'admin.php?page=inboxwp' );
}
