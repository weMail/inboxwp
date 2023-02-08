<?php

namespace WeDevs\Inboxwp\REST;

use WeDevs\Inboxwp\Api\AppApi;
use WeDevs\Inboxwp\RestController;

/**
 * I have created this to connect with the app but not used yet
 * This is a sample rest api for this project. This will need later
 */
class APP extends RestController
{
    /**
     * Route base url
     *
     * @var string
     */
    protected $rest_base = '/site';

    /**
     * Register all routes for this class
     *
     * @return void
     */
    public function register_routes()
    {
        $this->post('/connect', 'set_secrete', 'check_secret_key');
        $this->post('/disconnect', 'remove_secrete', 'check_secret_key');
    }

    /**
     * Set app api key as secrete key
     *
     * @param $request
     * @return \WP_Error|\WP_REST_Response
     */
    public function set_secrete($request)
    {
        if ($key = $request->get_param('key')) {
            update_option('inbox_wp_app_key', $key);
            $this->updateInfo();
            return $this->respond(['success' => true, 'message' => 'Successfully update the api key']);
        }
        return $this->respond_error('Sorry! The api key is not found', 422);
    }

    /**
     * Update site info in the remote
     */
    protected function updateInfo()
    {
        $user = wp_get_current_user();

        AppApi::instance()->put('/site/info', [
            'site_name'         => get_bloginfo( 'name' ),
            'site_email'        => get_bloginfo( 'admin_email' ),
            'site_url'          => untrailingslashit( site_url( '/' ) ),
            'home_url'          => untrailingslashit( home_url( '/' ) ),
            'rest_url_prefix'   => rest_get_url_prefix(),
            'language'          => get_option( 'WPLANG', 'en' ),
            'admin_name'        => isset($user->data->display_name) ? $user->data->display_name : '',
            'admin_email'       => isset($user->data->user_email) ? $user->data->user_email : '',
            'admin_url'         => admin_url(),
        ]);
    }

    /**
     * Remove the app secrete
     *
     * @return \WP_REST_Response
     */
    public function remove_secrete()
    {
        update_option('inbox_wp_app_key', '');
        return $this->respond(['success' => true, 'message' => 'Successfully removed the api key']);
    }
}
