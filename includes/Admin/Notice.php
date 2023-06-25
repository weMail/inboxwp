<?php

namespace WeDevs\Inboxwp\Admin;

use WeDevs\Inboxwp\Services\IgnoreEmail\SendingPermission;

class Notice {

    /**
    * Notice constructor.
    */
    public function __construct() {
        add_action( 'admin_notices', [ $this, 'email_ignore_notice' ] );
    }

    /**
    * Show email ignore notice
    *
    * @return void
    */
    public function email_ignore_notice() {
        $this->enqueue_assets();

        // Notice will not show if site is not connected
        if ( ! inboxwp_api_key() ) {
            return;
        }

        // Notice will not show if user dismissed it
        if ( isset( $_COOKIE['inboxwp_email_ignore_notice'] ) && $_COOKIE['inboxwp_email_ignore_notice'] ) {
            return;
        }

        $ignorePlugin = SendingPermission::instance()->ignoredPlugin();

        // Notice will not show if no ignored plugin found
        if ( ! $ignorePlugin ) {
            return;
        }

        $notice = sprintf(
            __( 'Hey seems you are using %1$s plugin to send bulk emails. You must disable %2$s plugin to continue using InboxWP for transactional email purposes.', 'inboxwp' ),
            '<strong class="inboxwp-ignore-notice-plugin-name">' . $ignorePlugin . '</strong>',
            '<strong class="inboxwp-ignore-notice-plugin-name">' . $ignorePlugin . '</strong>'
        );

        ?>
        <div id="inboxwp-email-ignore-notice" class="notice notice-warning is-dismissible">
            <p><?php echo $notice; ?></p>
            <p>You can manage both transactional emails & bulk campaign emails with <a target="_blank" href="https://getwemail.io/">weMail</a></p>
        </div>

        <div id="inboxwp-email-ignore-modal" class="modal-wrapper is-dismissible">
            <div class="modal">
                <h2 class="inboxwp-ignore-notice-modal-header">InboxWP is not delivering your emails. Are you sure about it?</h2>
                <div class="inboxwp-ignore-notice-btn-group">
                    <button type="button" id="remind-me-14days-later" class="inboxwp-ignore-notice-btn">Remind me this in 14 days</button>
                    <button type="button" id="never-remind-me" class="inboxwp-ignore-notice-btn">Never remind me. I understand the risk</button>
                </div>
            </div>
        </div>


        <?php
    }

    /**
     * Enqueue assets
     *
     * @return void
     */
    protected function enqueue_assets() {
        wp_enqueue_style('inboxwp-style');
        wp_enqueue_script( 'inboxwp-admin-script' );
    }
}
