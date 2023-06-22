<?php

namespace WeDevs\Inboxwp\Services\IgnoreEmail;

interface IgnoredPluginInterface {

    /**
     * Check if email is ignored
     *
     * @return boolean
     */
    public function check();
}
