<?php

namespace WeDevs\Inboxwp\Services\IgnoreEmail\Plugins;

use WeDevs\Inboxwp\Services\IgnoreEmail\IgnoredPluginInterface;
use WeDevs\Inboxwp\Traits\Singleton;

class FluentCRM implements IgnoredPluginInterface {

    use Singleton;

    /**
     * Check if email is ignored
     *
     * @return boolean
     */
    public function check() {         if ( defined( 'FLUENTCRM' ) || class_exists( 'FluentCrm\Framework\Foundation\App' ) ) {
            return true;
	}
        return false;
    }
}
