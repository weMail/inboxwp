<?php

namespace WeDevs\Inboxwp\AjaxHandlers\Stats;

use WeDevs\Inboxwp\AjaxHandlers\AjaxHandlerAbstract;
use WeDevs\Inboxwp\Services\Home;

class AjaxHandler extends AjaxHandlerAbstract
{
    /**
     * Ajax class constructor
     */
    public function __construct() {
        add_action( 'wp_ajax_inboxwp_get_stats', [ $this, 'get_stats' ] );
    }

    /**
     * Get stats
     *
     * @return void
     */
    public function get_stats() {
        if ( ! $this->checkNonce() ) {
            wp_send_json_error( [ 'message' => __( 'Opps! bad request.', 'inboxwp' ) ], 403 );
        }

        $stats = Home::instance()->getStats();
        if ( is_wp_error( $stats ) ) {
            wp_send_json_error( [ 'message' => $stats->get_error_message() ], $stats->get_error_code() );
        }
        wp_send_json_success( $stats );
    }
}