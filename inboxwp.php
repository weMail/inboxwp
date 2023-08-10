<?php

/**
 * Plugin Name:       InboxWP - Easy transactional emails
 * Plugin URI:        https://inboxwp.com
 * Description:       Send transactional emails with this plugin in the easiest way.
 * Version:           1.0
 * Author:            weDevs
 * Author URI:        https://inboxwp.com/
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       inboxwp
 * Domain Path:       /languages
 */

use WeDevs\Inboxwp\Admin;
use WeDevs\Inboxwp\API;
use WeDevs\Inboxwp\Assets;
use WeDevs\Inboxwp\Hooks;

// don't call the file directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * The main inboxWP plugin class
 */
final class InboxWP {
    /**
     * @var $inboxWP
     */
    private static $instance;

    /**
     * Plugin version
     *
     * @var string
     */
    const VERSION = '0.0.1';

    /**
     * InboxWP constructor.
     */
    private function __construct() {
        $this->define_constants();
        $this->includes();
        register_activation_hook( __FILE__, [ $this, 'activate' ] );
        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
        add_action( 'admin_init', [ $this, 'inboxwp_redirect' ] );
    }

    /**
     * Initializes a singleton instance
     *
     * @return InboxWP
     */
    public static function init() {
        if ( ! self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Required constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'INBOX_WP_VERSION', self::VERSION );
        define( 'INBOX_WP_FILE', __FILE__ );
        define( 'INBOX_WP_PATH', __DIR__ );
        define( 'INBOX_WP_INCLUDES', INBOX_WP_PATH . '/includes' );
        define( 'INBOX_WP_CORE', INBOX_WP_INCLUDES . '/Core' );
        define( 'INBOX_WP_URL', plugins_url( '', INBOX_WP_FILE ) );
        define( 'INBOX_WP_ASSETS', INBOX_WP_URL . '/assets' );
        define( 'INBOX_WP_APP_URL', $this->getAppUrl() );
    }

    /**
     * Do something when plugin active
     *
     * @return void
     */
    public function activate() {
        if ( ! get_option( 'inbox_wp_installed' ) ) {
            update_option( 'inbox_wp_installed', time() );
        }

        update_option( 'inbox_wp_version', INBOX_WP_VERSION );

        if ( ! inboxwp_site_hash() ) {
            inboxwp_set_site_hash();
        }
        update_option( 'inbox_wp_activated', true );
    }

    /**
     * Initialize the plugin
     */
    public function init_plugin() {
        new Assets();
        new API();
        new Hooks();
        if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
            new WeDevs\Inboxwp\Ajax();
        }
        if ( is_admin() ) {
            new Admin();
        }
    }

    /**
     * Includes core files
     *
     * @return void
     */
    public function includes() {
        require_once INBOX_WP_PATH . '/includes/Functions.php';
        $this->include_cors();
    }

    /**
     * Serve app url
     *
     * @return string
     */
    protected function getAppUrl() {
        $app_url = apply_filters( 'inboxwp_app_url', 'https://app.inboxwp.com' );
        return untrailingslashit( $app_url );
    }

    /**
     * Redirect to inboxwp admin page
     *
     * @return void
     */
    public function inboxwp_redirect() {
        if ( get_option( 'inbox_wp_activated' ) ) {
            delete_option( 'inbox_wp_activated' );
            wp_safe_redirect( inboxwp_get_admin_url() );
        }
    }

    /**
     * init the core classes
     *
     * @return void
     */
    private function include_cors() {
        $class_dirs = glob( INBOX_WP_CORE . '/*', GLOB_ONLYDIR );
        foreach ( $class_dirs as $dir ) {
            $className = str_replace( INBOX_WP_CORE . '/', '', $dir );
            $class = "\\WeDevs\\Inboxwp\Core\\$className\\Menu";
            if ( class_exists( $class ) ) {
                new $class();
            }
        }
    }
}

/**
 * Initializes the main plugin
 *
 * @return InboxWP
 */
function inbox_wp() {
    return InboxWP::init();
}

inbox_wp();
