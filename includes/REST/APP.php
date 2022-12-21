<?php

namespace WeDevs\Inboxwp\REST;

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
    protected $rest_base = '/app';

    /**
     * Register all routes for this class
     *
     * @return void
     */
    public function register_routes()
    {
        $this->post('/connect', 'set_secrete', 'check_secret_key');
    }

    public function set_secrete($request)
    {
        if ($key = $request->get_param('key')) {
            update_option('inbox_wp_app_key', $key);
            return $this->respond(['success' => true, 'message' => 'Successfully update the api key']);
        }
        return $this->respond_error('Sorry! The api key is not found', 422);
    }
}
