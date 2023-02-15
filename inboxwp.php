<?php

/**
 * Plugin Name:       inboxWP - The easiest solution to send transactional emails in WordPress
 * Plugin URI:        https://example.com/plugins/the-basics/
 * Description:       Send transactional emails with this plugin in the easiest way.
 * Version:           0.0.1
 * Author:            weDevs
 * Author URI:        https://wedevs.com/
 * License:           GPL-3.0
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       inboxwp
 * Domain Path:       /languages
 */

use WeDevs\Inboxwp\Admin;
use WeDevs\Inboxwp\API;
use WeDevs\Inboxwp\Assets;
use WeDevs\Inboxwp\Hooks;

// don't call the file directly
if (!defined('ABSPATH')) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * The main inboxWP plugin class
 */
final class InboxWP
{
    /**
     * @var $inboxWP
     */
    private static $instance;

    /**
     * Plugin version
     *
     * @var string
     */
    const vsersion = '0.0.1';

    /**
     * InboxWP constructor.
     */
    private function __construct()
    {
        $this->define_constants();
        $this->includes();
        register_activation_hook(__FILE__, [$this, 'activate']);
        add_action('plugins_loaded', [$this, 'init_plugin']);
    }

    /**
     * Initializes a singleton instance
     *
     * @return InboxWP
     */
    public static function init()
    {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Required constants
     *
     * @return void
     */
    public function define_constants()
    {
        define('INBOX_WP_VERSION', self::vsersion);
        define('INBOX_WP_FILE', __FILE__);
        define('INBOX_WP_PATH', __DIR__);
        define('INBOX_WP_URL', plugins_url('', INBOX_WP_FILE));
        define('INBOX_WP_ASSETS', INBOX_WP_URL . '/assets');
        define('INBOX_WP_APP_URL', 'http://app.inboxwp.test');
    }

    /**
     * Do something when plugin active
     *
     * @return void
     */
    public function activate()
    {
        if (!get_option('inbox_wp_installed')) {
            update_option('inbox_wp_installed', time());
        }

        update_option('inbox_wp_version', INBOX_WP_VERSION);

        if (!inboxwp_site_hash()) {
            inboxwp_set_site_hash();
        }
    }

    /**
     * Initialize the plugin
     */
    public function init_plugin()
    {
        if (is_admin()) {
            new Admin();
            new Assets();
        }
        new API();
        if (defined('DOING_AJAX') && DOING_AJAX) {
            new WeDevs\Inboxwp\Ajax();
        }
        new Hooks();
    }

    /**
     * Includes core files
     *
     * @return void
     */
    public function includes()
    {
        require_once INBOX_WP_PATH . '/includes/Functions.php';
    }
}

/**
 * Initializes the main plugin
 *
 * @return InboxWP
 */
function inbox_wp()
{
    return InboxWP::init();
}

inbox_wp();
