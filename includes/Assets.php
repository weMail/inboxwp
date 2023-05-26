<?php


namespace WeDevs\Inboxwp;

class Assets {

    public function __construct() {         add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
    }

    public function get_scripts() {         return [
		'inboxwp-script' => [
			'src' => INBOX_WP_ASSETS . '/js/admin-script.js',
			'version' => filemtime( INBOX_WP_PATH . '/assets/js/admin-script.js' ),
		],
		'inboxwp-react-script' => [
			'src' => INBOX_WP_URL . '/build/index.js',
			'version' => filemtime( INBOX_WP_PATH . '/build/index.js' ),
			'deps' => [ 'wp-element' ],
		],
	];
    }

    public function get_styles() {         return [
		'inboxwp-style' => [
			'src' => INBOX_WP_ASSETS . '/css/admin-style.css',
			'version' => filemtime( INBOX_WP_PATH . '/assets/css/admin-style.css' ),
		],
		'inboxwp-tailwind-ui-font' => [
			'src' => 'https://rsms.me/inter/inter.css',
			'version' => INBOX_WP_VERSION,
		],
		'react-style' => [
			'src' => INBOX_WP_URL . '/build/index.css',
			'version' => filemtime( INBOX_WP_PATH . '/build/index.css' ),
		],
	];
    }

    public function enqueue_assets() {         $scripts = $this->get_scripts();

        foreach ( $scripts as $handle => $script ) {
            $deps = isset( $script['deps'] ) ? $script['deps'] : false;
            wp_register_script( $handle, $script['src'], $deps, $script['version'], true );
        }

        $styles = $this->get_styles();

        foreach ( $styles as $handle => $style ) {
            $deps = isset( $style['deps'] ) ? $style['deps'] : false;
            wp_register_style( $handle, $style['src'], $deps, $style['version'] );
        }

        wp_localize_script(
            'inboxwp-react-script', 'inboxwp', [
				'ajaxurl' => admin_url( 'admin-ajax.php' ),
				'hash' => wp_create_nonce( 'inboxwp-nonce' ),
				'siteHash' => inboxwp_site_hash(),
				'appUrl' => INBOX_WP_APP_URL,
				'siteUrl' => untrailingslashit( site_url( '/' ) ),
				'restPrefix' => rest_get_url_prefix(),
			]
        );
    }
}
