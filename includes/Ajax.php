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
    }

    public function get_app_url()
    {
        if (check_admin_referer('inboxwp-nonce', 'hash')) {
            // $user = wp_get_current_user();
            $redirect_url = admin_url() . '?page=inboxwp';
            $secret = get_option('inboxwp_site_secret');
            if ($secret) {
                $url = INBOX_WP_APP_URL . '/register?site_key=' . $secret . '&redirect_url=' . $redirect_url;
            } else {
                $url = INBOX_WP_APP_URL . '/register?site_name=' . urlencode(get_bloginfo('name')) . '&site_hash=' . get_option('inbox_wp_site_hash') . '&home_url=' . untrailingslashit(home_url('/')) . '&site_url=' . untrailingslashit(site_url('/')) . '&site_email=' . get_bloginfo('admin_email') . '&redirect_url=' . $redirect_url;
            }
            wp_send_json_success(['url' => $url]);
        }

        wp_send_json_error();
    }
}
