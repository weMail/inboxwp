<?php

namespace WeDevs\Inboxwp\API;

use WeDevs\Inboxwp\Traits\Singleton;
use WP_Error;

class AppApi {

    use Singleton;
    /**
     * Set base url
     *
     * @var string
     */
    private $base_url = INBOX_WP_APP_URL . '/api/v1/';

    /**
     * The arguments for wp_remote_get or wp_remote_post
     *
     * @param array $args
     *
     * @return array
     */
    private function args( $args ) {
        $defaults = [
            'headers' => [
                'x-app-key' => inboxwp_api_key(),
                'x-site-hash' => inboxwp_site_hash(),
                'Accept' => 'application/json',
            ],
        ];

        return wp_parse_args( $args, $defaults );
    }


    /**
     * Build API URL from resource, endpoint, params and queries
     *
     * If $url and/or $query are provided explicitly, it will use them
     * instead of resource, endpoints etc
     *
     * @since 1.0.0
     *
     * @param string $url
     * @param array $query
     *
     * @return string
     */
    private function build_url( $url = '', $query = [] ) {
        $base_url = $this->base_url . inboxwp_parse_domain( site_url( '/' ) );
        if ( $url ) {
            $url = $base_url . $url;
        } else {
            $url = $base_url;
        }

        if ( ! empty( $query ) ) {
            $url = add_query_arg( $query, $url );
        }

        return $url;
    }

    /**
     * API - GET request caller
     *
     * @param string $url   API resource
     * @param array  $query Additional query
     * @param array  $args  wp_remote_get argument overrides
     *
     * @return mixed
     */
    public function get( $url = '', $query = [], $args = [] ) {
        $url = $this->build_url( $url, $query );
        $args = $this->args( $args );
        $args['timeout'] = 60;

        $response = wp_remote_get( $url, $args );

        return $this->response( $response );
    }


    /**
     * API - POST request caller
     *
     * @param array $data POST data
     * @param array $args wp_remote_post argument overrides
     *
     * @return mixed
     */
    public function post( $url = '', $data = [], $args = [] ) {
        $args = $this->args( $args );
        $args['timeout'] = 60;

        $args['body'] = ! empty( $data ) ? $data : null;

        $url = $this->build_url( $url );

        $args['headers']['Content-Type'] = 'application/json';
        $args['data_format'] = 'body';
        $args['body'] = wp_json_encode( $args['body'] );

        $response = wp_remote_post( $url, $args );

        return $this->response( $response );
    }


    /**
     * API - PUT request caller
     *
     * @param string $url
     * @param array $data
     * @param array $args
     * @return array|mixed|WP_Error
     */
    public function put( $url = '', $data = [], $args = [] ) {
        $data['_method'] = 'put';

        return $this->post( $url, $data, $args );
    }

    /**
     * @param array $data
     * @param string $url
     * @param array $args
     * @return array|mixed|WP_Error
     */
    public function patch( $url = '', $data = [], $args = [] ) {
        $data['_method'] = 'patch';

        return $this->post( $url, $data, $args );
    }

    /**
     * API - DELETE request caller
     *
     * @param array $data Additional query data
     * @param array $args wp_remote_request argument overrides
     *
     * @return mixed
     */
    public function delete( $data = [], $args = [] ) {
        $args = $this->args( $args );

        $args['method'] = 'delete';

        $args['body'] = ! empty( $data ) ? $data : null;

        $url = $this->build_url();

        $response = wp_remote_request( $url, $args );

        return $this->response( $response );
    }


    /**
     * Response handler for API calls
     *
     * @param array|WP_Error $response
     *
     * @return array|WP_Error
     */
    private function response( $response ) {
        if ( is_wp_error( $response ) ) {
            return $response;
        }

        $response_code = wp_remote_retrieve_response_code( $response );
        $body = json_decode( $response['body'], true );

        if ( $response_code >= 200 && $response_code <= 299 ) {
            return $body;
        } else {
            $message = is_array( $body ) && array_key_exists( 'message', $body )
                ? $body['message']
                : __( 'Something went wrong', 'inboxwp' );

            $error_data = [
                'status' => $response_code,
            ];

            if (
                isset( $body['errors'] ) &&
                ! empty( $body['errors'] ) &&
                is_array( $body['errors'] )
            ) {
                $error_data['errors'] = $body['errors'];
            }

            return new WP_Error( 'error', $message, $error_data );
        }
    }
}
