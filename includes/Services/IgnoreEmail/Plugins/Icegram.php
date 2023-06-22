<?php

namespace WeDevs\Inboxwp\Services\IgnoreEmail\Plugins;

use WeDevs\Inboxwp\Traits\Singleton;

class Icegram implements \WeDevs\Inboxwp\Services\IgnoreEmail\IgnoredPluginInterface {


    use Singleton;
    /**
     * @inheritDoc
     */
    public function check() {         if ( defined( 'IG_ES_TRACKER_VERSION' ) || class_exists( 'Email_Subscribers' ) ) {
            return true;
	}
        return false;
    }
}
