<?php

namespace WeDevs\Inboxwp\AjaxHandlers;

use WeDevs\Inboxwp\API\AppApi;
use WeDevs\Inboxwp\Traits\NonceChecker;

class AjaxHandlerAbstract {

    use NonceChecker;

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
