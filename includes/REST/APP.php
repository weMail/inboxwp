<?php

namespace WeDevs\Inboxwp\REST;

use WP_REST_Controller;
use WP_REST_Server;

/**
 * I have created this to connect with the app but not used yet
 * This is a sample rest api for this project. This will need later
 */
class REST extends WP_REST_Controller
{
    function __construct()
    {
        $this->namespace = 'inboxwp/v1';
        $this->rest_base = 'app';
    }

    /**
     * Register all routes for this class
     *
     * @return void
     */
    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/connection/params',
            [
                [
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => [$this, 'get_params'],
                    'permission_callback' => [$this, 'get_items_permissions_check'],
                    'args' => ''
                ]
            ]
        );
    }

    public function get_params($request)
    {
        $secret = get_option('inboxwp_site_secret');
        if ($secret) {
            // return secret and redirect url
        }
        // return all site required site data
        global $wp;
        return home_url($wp->request);
    }

    /**
     * Checks if a given request has access to reade the connection params
     *
     * @param \WP_REST_Request $request
     * @return \WP_REST_Response
     */
    public function get_items_permissions_check($request)
    {
        if (current_user_can('manage_options')) {
            return true;
        }
        return false;
    }
}
