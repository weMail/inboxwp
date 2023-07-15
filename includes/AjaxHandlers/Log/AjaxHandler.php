<?php

namespace WeDevs\Inboxwp\AjaxHandlers\Log;

use WeDevs\Inboxwp\AjaxHandlers\AjaxHandlerAbstract;

class AjaxHandler extends AjaxHandlerAbstract
{
    /**
     * Ajax class constructor
     */
    public function __construct() {
        add_action( 'wp_ajax_inboxwp_app_connection_url', [ $this, 'get_app_url' ] );
    }
}