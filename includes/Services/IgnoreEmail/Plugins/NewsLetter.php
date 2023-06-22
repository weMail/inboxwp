<?php

namespace WeDevs\Inboxwp\Services\IgnoreEmail\Plugins;

use WeDevs\Inboxwp\Traits\Singleton;

class NewsLetter implements \WeDevs\Inboxwp\Services\IgnoreEmail\IgnoredPluginInterface
{
    use Singleton;

    /**
     * @inheritDoc
     */
    public function check()
    {
        if ( defined( 'NEWSLETTER_VERSION' ) || class_exists( 'NewsletterStatistics' ) ) {
            return true;
        }
        return false;
    }
}