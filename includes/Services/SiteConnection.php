<?php

namespace WeDevs\Inboxwp\Services;

use WeDevs\Inboxwp\API\AppApi;
use WeDevs\Inboxwp\Traits\Singleton;

class SiteConnection {
    use Singleton;
    /**
     * Generate app connection url to connect with app
     *
     * @return string
     */
    public function appUrl() {
        $redirect_url = admin_url() . '/admin.php?page=inboxwp';
        $user = wp_get_current_user();
        $admin_name = $user->data->display_name;
        return INBOX_WP_APP_URL . '/checkout?rest_url_prefix=' . rest_get_url_prefix() . '&site_name=' . rawurlencode( get_bloginfo( 'name' ) ) . '&site_hash=' . inboxwp_site_hash() . '&home_url=' . untrailingslashit( home_url( '/' ) ) . '&site_url=' . untrailingslashit( site_url( '/' ) ) . '&site_email=' . get_bloginfo( 'admin_email' ) . '&admin_name=' . $admin_name . '&admin_email=' . $user->data->user_email . '&redirect_url=' . $redirect_url;
    }

    /**
     * Disconnect from the app
     *
     * @return bool
     */
    public function disconnect() {
        $this->remoteDisconnect();
        delete_option( 'inbox_wp_app_key' );
        return true;
    }

    protected function remoteDisconnect() {
        return AppApi::instance()->post( '/disconnect-site' );
    }
}
