<?php

namespace WeDevs\Inboxwp\Admin;

/**
 * Responsible for admin menu
 */
class Menu {

    /**
     * Class constructor
     */
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    /**
     * Register admin menu
     *
     * @return void
     */
    public function admin_menu() {
        global $submenu;

        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }
        $capability = 'read';

        $hook = add_menu_page( __( 'InboxWP', 'inboxwp' ), __( 'InboxWP', 'inboxwp' ), 'manage_options', 'inboxwp', [ $this, 'plugin_page' ], 'dashicons-email' );
        $submenu['inboxwp'] = apply_filters( 'inboxwp_admin_submenu', [], $capability );

        add_action( 'admin_head-' . $hook, [ $this, 'enqueue_assets' ] );
    }

    /**
     * Load menu page
     *
     * @return void
     */
    public function plugin_page() {
        $view = INBOX_WP_PATH . '/templates/app.php';
        if ( file_exists( $view ) ) {
            include $view;
        }
    }

    /**
     * Enqueue assets
     *
     * @return void
     */
    public function enqueue_assets() {
        wp_enqueue_style( 'inboxwp-style' );
        wp_enqueue_style( 'inboxwp-react-style' );
        wp_enqueue_style( 'inboxwp-style' );
        wp_enqueue_script( 'inboxwp-react-script' );
        wp_enqueue_style( 'inboxwp-tailwind-ui-font' );
    }

    public function form_handler() {
        //
    }
}
