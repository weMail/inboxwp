<?php

namespace WeDevs\Inboxwp\Traits;

use WeDevs\Inboxwp\API\AppApi;

trait NonceChecker {
    /**
     * Check nonce
     *
     * @return false|int|null
     */
    protected function checkNonce() {
        return check_admin_referer( 'inboxwp-nonce', 'hash' );
    }

    /**
     * Make api call
     *
     * @param $method
     * @param $url
     * @param $data
     * @return void
     */
    protected function callApi($method, $url, $data = [])
    {
        $this->checkNonce();

        $response = AppApi::instance()->{$method}($url, $data);

        if (is_wp_error($response)) {
            wp_send_json_error(['message' => $response->get_error_message()], $response->get_error_data()['status']);
        }
        wp_send_json_success($response);
    }
}
