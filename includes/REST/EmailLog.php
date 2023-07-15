<?php

namespace WeDevs\Inboxwp\REST;

use WeDevs\Inboxwp\API\AppApi;
use WeDevs\Inboxwp\RestController;

class EmailLog extends RestController {

    /**
     * Route base url
     *
     * @var string
     */
    protected $rest_base = '/email';

    /**
     * Register all routes for this class
     *
     * @return void
     */
    public function register_routes() {
        $this->get( '/logs', 'get_email_logs', 'check_secret_key' );
        $this->get( '/message/(?P<id>[a-fA-F0-9-]+)', 'get_email_details', 'check_secret_key' );
    }

    /**
     * Get email logs
     *
     * @param $request
     * @return WP_Error|WP_REST_Response
     */
    public function get_email_logs( $request ) {
        $logs = AppApi::instance()->get( '/email/logs', $request->get_params() );

        if ( is_wp_error( $logs ) ) {
            wp_send_json_error( [ 'message' => $logs->get_error_message() ], $logs->get_error_data()['status'] );
        }

        return $this->respond(
            [
                'success' => true,
                'data' => [
                    'logs' => $logs,
                ],
            ]
        );
    }

    public function get_email_details( $request ) {
        $id = $request->get_param( 'id' );
        /**
         * @var $message \WP_REST_Request
         */
        $message = AppApi::instance()->get( "/email/message/$id" )['message'];

        if ( is_wp_error( $message ) || isset( $message['ErrorCode'] ) ) {
            return $this->respond_error( 'Sorry! The message is not found', 422 );
        }
        return $this->respond(
            [
                'success' => true,
                'data' => [
                    'message' => $message,
                ],
            ]
        );
    }
}
