<?php

namespace WeDevs\Inboxwp\Traits;

trait NonceChecker
{
    protected function checkNonce() {
        return check_admin_referer( 'inboxwp-nonce', 'hash' );
    }
}