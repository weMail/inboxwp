<?php

namespace WeDevs\Inboxwp\AjaxHandlers\App;

use WeDevs\Inboxwp\AjaxHandlers\AjaxHandlerAbstract;
use WeDevs\Inboxwp\Services\SiteConnection;
class AjaxHandler extends AjaxHandlerAbstract {

    /**
     * Ajax class constructor
     */
    public function __construct() {
        add_action( 'wp_ajax_inboxwp_app_connection_url', [ $this, 'get_app_url' ] );
        add_action( 'wp_ajax_inboxwp_app_subscription_checking', [ $this, 'check_subscription' ] );
        add_action( 'wp_ajax_inboxwp_app_disconnect', [ $this, 'disconnect_app' ] );
    }

    /**
     * Generate the app connection url
     *
     * @return void
     */
    public function get_app_url() {
        if ( $this->checkNonce() ) {
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
        if ( $this->checkNonce() ) {
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
        if ( $this->checkNonce() ) {
            if ( SiteConnection::instance()->disconnect() ) {
                wp_send_json_success( [ 'message' => __( 'Successfully disconnected', 'inboxwp' ) ] );
            }
            wp_send_json_error( [ 'message' => __( 'Opps! something went wrong.', 'inboxwp' ) ] );
        }

        wp_send_json_error( [ 'message' => __( 'Opps! bad request.', 'inboxwp' ) ], 403 );
    }
}
