<?php

namespace WeDevs\Inboxwp\Traits;

use WeDevs\Inboxwp\API\AppApi;

trait NonceChecker {
    /**
     * Check nonce
     *
     * @return false|int|null
     */
    protected function checkNonce() {
        return check_admin_referer( 'inboxwp-nonce', 'hash' );
    }
}
