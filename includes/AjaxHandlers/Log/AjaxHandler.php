<?php

namespace WeDevs\Inboxwp\AjaxHandlers\Log;

use WeDevs\Inboxwp\AjaxHandlers\AjaxHandlerAbstract;
use WeDevs\Inboxwp\API\AppApi;

class AjaxHandler extends AjaxHandlerAbstract {

    /**
     * Ajax class constructor
     */
    public function __construct() {
        add_action( 'wp_ajax_inboxwp_email_logs', [ $this, 'get_email_logs' ] );
        add_action( 'wp_ajax_inboxwp_email_details', [ $this, 'get_email_details' ] );
    }

    /**
     * Mail logs
     *
     * @return void
     */
    public function get_email_logs() {
        if ( ! $this->checkNonce() ) {
            wp_send_json_error( [ 'message' => __( 'Opps! bad request.', 'inboxwp' ) ], 403 );
        }

        $logs = AppApi::instance()->get( '/email/logs', $this->get_params() );

        if ( is_wp_error( $logs ) ) {
            wp_send_json_error( [ 'message' => $logs->get_error_message() ], $logs->get_error_data()['status'] );
        }
        wp_send_json_success( $logs );
    }

    /**
     * Email details
     *
     * @return void
     */
    public function get_email_details() {
        if ( ! $this->checkNonce() ) {
            wp_send_json_error( [ 'message' => __( 'Opps! bad request.', 'inboxwp' ) ], 403 );
        }

        if ( ! $id = $_POST['id'] ) {
            wp_send_json_error( [ 'message' => __( 'Opps! bad request. Message id not found', 'inboxwp' ) ], 403 );
        }

            $message = AppApi::instance()->get( "/email/message/$id" )['message'];

        if ( is_wp_error( $message ) || isset( $message['ErrorCode'] ) ) {
            wp_send_json_error( [ 'message' => __( 'Sorry! The message is not found', 'inboxwp' ) ], 422 );
        }
        wp_send_json_success( $message );
    }

    /**
     * Format params
     *
     * @return array
     */
    private function get_params() {
        $queryKeys = [
			'from',
			'to',
			'searchKey',
			'status',
		];
        $params = [];

		foreach ( $_REQUEST as $key => $value ) {
			if ( in_array( $key, $queryKeys ) ) {
				$params[ $key ] = $value;
			}
		}
        return $params;
    }
}
