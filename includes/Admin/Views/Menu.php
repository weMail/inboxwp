<div class="wrap inboxwp-flex inboxwp-h-screen">
    <div class="inboxwp-text-center inboxwp-m-auto inboxwp-w-2/3">
        <svg class="inboxwp-mx-auto inboxwp-h-12 inboxwp-w-12 inboxwp-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 class="inboxwp-mt-2 inboxwp-text-lg inboxwp-font-medium inboxwp-text-gray-900"><?php _e("Let’s connect your website with InboxWP", 'inboxwp'); ?></h3>
        <p class="inboxwp-mt-1 inboxwp-text-sm inboxwp-text-gray-500 inboxwp-px-48"><?php _e("Let MailSend take care of all emails that goes through your WordPress site. Power up your WordPress email game with just a few clicks", 'inboxwp') ?></p>
        <div class="inboxwp-mt-6">
            <form action="" method="post">
                <?php wp_nonce_field('inboxwp-connect-form') ?>
                <button type="submit" name="inboxwp-connect" class="inboxwp-inline-flex inboxwp-items-center inboxwp-rounded-md inboxwp-border inboxwp-border-transparent inboxwp-bg-indigo-600 inboxwp-px-4 inboxwp-py-2 inboxwp-text-sm inboxwp-font-medium inboxwp-text-white inboxwp-shadow-sm inboxwp-hover:bg-indigo-700 inboxwp-focus:outline-none inboxwp-focus:ring-2 inboxwp-focus:ring-indigo-500 inboxwp-focus:ring-offset-2">
                    <?php _e('Connect your website', 'inboxwp') ?>
                </button>
            </form>
        </div>
    </div>
</div>