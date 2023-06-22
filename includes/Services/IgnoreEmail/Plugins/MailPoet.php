<?php

namespace WeDevs\Inboxwp\Services\IgnoreEmail\Plugins;

use WeDevs\Inboxwp\Traits\Singleton;

class MailPoet implements \WeDevs\Inboxwp\Services\IgnoreEmail\IgnoredPluginInterface
{
    use Singleton;

    /**
     * @inheritDoc
     */
    public function check()
    {
        if ( defined( 'MAILPOET_VERSION' ) || class_exists( 'MailPoet\DI\ContainerWrapper' ) ) {
            return true;
        }
        return false;
    }
}