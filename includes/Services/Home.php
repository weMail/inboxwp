<?php


namespace WeDevs\Inboxwp\Services;

use WeDevs\Inboxwp\API\AppApi;
use WeDevs\Inboxwp\Traits\Singleton;
use WP_Error;
use WP_REST_Response;

class Home {

    use Singleton;

    public function getStats() {
        if ( ! inboxwp_api_key() ) {
            return new WP_Error(403, 'The site is not connected !');
	    }
        return AppApi::instance()->get( '/stats', [], [ 'timeout' => 2000 ] );
    }
}
