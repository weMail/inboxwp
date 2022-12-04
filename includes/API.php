<?php

namespace WeDevs\Inboxwp;

use WeDevs\Inboxwp\API\APP;

class API
{
    function __construct()
    {
        add_action('rest_api_init', [$this, 'register_api']);
    }

    public function register_api()
    {
        $app = new APP();
        $app->register_routes();
    }
}
