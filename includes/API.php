<?php

namespace WeDevs\Inboxwp;

use WeDevs\Inboxwp\REST\APP;

class API {
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_api' ] );
    }

    public function register_api() {
        new APP();
    }
}
