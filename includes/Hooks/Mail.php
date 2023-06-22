<?php

namespace WeDevs\Inboxwp\Hooks;

use WeDevs\Inboxwp\InboxWpMailer;
use WeDevs\Inboxwp\Services\IgnoreEmail\SendingPermission;
use WeDevs\Inboxwp\Traits\Hooker;

class Mail {


    use Hooker;

    /**
     * Hooks constructor.
     */
    public function __construct() {
        $this->add_action( 'phpmailer_init', 'handle_emails' );
    }

    /**
     * Replace phpmailer instance
     *
     * @param $phpmailer
     * @return void
     */
    public function handle_emails( &$phpmailer ) {
        if ( ! inboxwp_api_key() ) {
            return;
        }

        /**
         * Check if email is ignored
         */
        if ( SendingPermission::instance()->ignoredPlugin() ) {
            return;
        }

        global $wp_version;

        $mailer = new InboxWpMailer();
        $mailer->setPHPMailer( clone $phpmailer );

        $phpmailer = $mailer;
    }
}
