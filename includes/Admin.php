<?php
namespace WeDevs\Inboxwp;

use WeDevs\Inboxwp\Admin\Menu;
use WeDevs\Inboxwp\Admin\Notice;

/**
 * Class Admin
 */
class Admin {
    public function __construct() {
        new Menu();
        new Notice();
    }
}
