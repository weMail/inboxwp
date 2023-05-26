<?php

namespace WeDevs\Inboxwp;

use WeDevs\Inboxwp\Hooks\Mail;

class Hooks {
    public function __construct() {
        new Mail();
    }
}
