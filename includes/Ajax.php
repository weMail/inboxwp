<?php

namespace WeDevs\Inboxwp;

use WeDevs\Inboxwp\Services\Home;
use WeDevs\Inboxwp\Services\SiteConnection;

/**
 * Ajax handling class
 */
class Ajax {

    /**
     * Ajax class constructor
     */
    public function __construct() {
        add_action( 'wp_ajax_inboxwp_app_connection_url', [ $this, 'get_app_url' ] );
        add_action( 'wp_ajax_inboxwp_app_subscription_checking', [ $this, 'check_subscription' ] );
        add_action( 'wp_ajax_inboxwp_app_disconnect', [ $this, 'disconnect_app' ] );
        add_action( 'wp_ajax_inboxwp_app_get_stats', [ $this, 'get_stats' ] );
    }

    /**
     * Generate the app connection url
     *
     * @return json
     */
    public function get_app_url() {
        if ( check_admin_referer( 'inboxwp-nonce', 'hash' ) ) {
            wp_send_json_success( [ 'url' => SiteConnection::instance()->appUrl() ] );
        }
        wp_send_json_error();
    }

    /**
     * Check site subscription and get secret key
     *
     * @return void
     */
    public function check_subscription() {
        if ( check_admin_referer( 'inboxwp-nonce', 'hash' ) ) {
            $api_key = inboxwp_api_key();
            if ( $api_key ) {
                wp_send_json_success(
                    [
                        'success' => true,
                        'key' => $api_key,
                    ]
                );
            }
            wp_send_json_error();
        }

        wp_send_json_error();
    }

    /**
     * Disconnect from the app
     */
    public function disconnect_app() {
        if ( check_admin_referer( 'inboxwp-nonce', 'hash' ) ) {
            if ( SiteConnection::instance()->disconnect() ) {
                wp_send_json_success( [ 'message' => __( 'Successfully disconnected', 'inboxwp' ) ] );
            }
            wp_send_json_error( [ 'message' => __( 'Opps! something went wrong.', 'inboxwp' ) ] );
	    }

        wp_send_json_error( [ 'message' => __( 'Opps! bad request.', 'inboxwp' ) ], 403 );
    }

    public function get_stats() {
        $stats = Home::instance()->getStats();
        if ( $stats ) {
            wp_send_json_success( $stats );
	    }
        wp_send_json_error( [ 'message' => __( 'Opps! Something went wrong', 'inboxwp' ) ] );
    }
}
