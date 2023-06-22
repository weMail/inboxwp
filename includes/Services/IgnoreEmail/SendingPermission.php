<?php

namespace WeDevs\Inboxwp\Services\IgnoreEmail;

use WeDevs\Inboxwp\Services\IgnoreEmail\Plugins\FluentCRM;
use WeDevs\Inboxwp\Services\IgnoreEmail\Plugins\Icegram;
use WeDevs\Inboxwp\Services\IgnoreEmail\Plugins\MailPoet;
use WeDevs\Inboxwp\Services\IgnoreEmail\Plugins\NewsLetter;
use WeDevs\Inboxwp\Traits\Singleton;

class SendingPermission {

    use Singleton;

    /**
     * Ignored plugins
     *
     * @var IgnoredPluginInterface[]
     */
    protected $ignoredPlugins = [
        'FluentCRM' => FluentCRM::class,
        'MailPoet' => MailPoet::class,
        'Icegram Express' => Icegram::class,
        'Newsletter' => NewsLetter::class,
    ];

    /**
     * Check if email is ignored
     *
     * @return boolean
     */
    public function ignoredPlugin() {         foreach ( $this->ignoredPlugins as $key => $class ) {
            if ( class_exists( $class ) ) {
                if ( $class::instance()->check() ) {
                    return $key;
                }
            }
	}
        return false;
    }
}
