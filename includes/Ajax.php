<?php

namespace WeDevs\Inboxwp;

/**
 * Ajax handling class
 */
class Ajax
{
    /**
     * Ajax class constructor
     */
    function __construct()
    {
        add_action('wp_ajax_inboxwp_app_connection_url', [$this, 'get_app_url']);
        add_action('wp_ajax_inboxwp_app_subscription_checking', [$this, 'check_subscription']);
        add_action('wp_ajax_inboxwp_app_disconnect', [$this, 'disconnect_app']);
    }

    /**
     * Generate the app connection url
     *
     * @return json
     */
    public function get_app_url()
    {
        if (check_admin_referer('inboxwp-nonce', 'hash')) {
            $redirect_url = admin_url() . '?page=inboxwp';
            $url = INBOX_WP_APP_URL . '/checkout?rest_url_prefix=' . rest_get_url_prefix() . '&site_name=' . urlencode(get_bloginfo('name')) . '&site_hash=' . site_hash() . '&home_url=' . untrailingslashit(home_url('/')) . '&site_url=' . untrailingslashit(site_url('/')) . '&site_email=' . get_bloginfo('admin_email') . '&redirect_url=' . $redirect_url;
            wp_send_json_success(['url' => $url]);
        }

        wp_send_json_error();
    }

    /**
     * Check site subscription and get secret key
     *
     * @return void
     */
    public function check_subscription()
    {
        if (check_admin_referer('inboxwp-nonce', 'hash')) {
            $apiKey = inboxwp_api_key();
            if ($apiKey) {
                wp_send_json_success(['success' => true, 'key' => $apiKey]);
            }
            wp_send_json_error();
        }

        wp_send_json_error();
    }

    public function disconnect_app()
    {
        if (check_admin_referer('inboxwp-nonce', 'hash')) {
            // wp_send_json_success();
            if (inboxwp_api_key()) {
                delete_option('inbox_wp_app_key');
                wp_send_json_success(['success' => true, 'message' => 'Successfully disconnected']);
            }
            wp_send_json_error();
        }

        wp_send_json_error();
    }
}
