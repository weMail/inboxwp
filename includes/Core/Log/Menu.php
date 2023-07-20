<?php

namespace WeDevs\Inboxwp\Core\Log;

use WeDevs\Inboxwp\Traits\Hooker;

class Menu {

    use Hooker;

    public function __construct() {
        $this->add_filter( 'inboxwp_admin_submenu', 'register_submenu', 11, 2 );
    }

    public function register_submenu( $menu_items, $capability ) {
        $menu_items[] = [ __( 'Email log', 'inboxwp' ), $capability, 'admin.php?page=inboxwp#/logs' ];
        return $menu_items;
    }
}
