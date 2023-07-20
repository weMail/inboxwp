<?php

namespace WeDevs\Inboxwp;

use WeDevs\Inboxwp\Services\Home;
use WeDevs\Inboxwp\Services\SiteConnection;
use WeDevs\Inboxwp\Traits\NonceChecker;

/**
 * Ajax handling class
 */
class Ajax {
    /**
     * Ajax class constructor
     */
    public function __construct() {
        $path = INBOX_WP_INCLUDES . '/AjaxHandlers';
        $class_dirs = glob( $path . '/*', GLOB_ONLYDIR );
        foreach ( $class_dirs as $dir ) {
            $className = str_replace( $path . '/', '', $dir );
            $class = "\\WeDevs\\Inboxwp\AjaxHandlers\\$className\\AjaxHandler";
            if ( class_exists( $class ) ) {
                new $class();
            }
        }
    }
}
