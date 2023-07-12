<?php

namespace WeDevs\Inboxwp\Core\Home;

use WeDevs\Inboxwp\Traits\Hooker;

class Menu {

    use Hooker;

    public function __construct() {
        $this->add_filter( 'inboxwp_admin_submenu', 'register_submenu', 10, 2 );
    }

    public function register_submenu( $menu_items, $capability ) {
        $menu_items[] = [ __( 'Home', 'inboxwp' ), $capability, 'admin.php?page=inboxwp#' ];
        return $menu_items;
    }
}
