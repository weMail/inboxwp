<?php

namespace WeDevs\Inboxwp\AjaxHandlers\SendingSignature;

use WeDevs\Inboxwp\AjaxHandlers\AjaxHandlerAbstract;
use WeDevs\Inboxwp\API\AppApi;

class AjaxHandler extends AjaxHandlerAbstract {

    /**
     * Ajax class constructor
     */
    public function __construct() {
        add_action( 'wp_ajax_inboxwp_get_signature', [ $this, 'get_signature' ] );
        add_action( 'wp_ajax_inboxwp_add_domain', [ $this, 'add_domain' ] );
        add_action( 'wp_ajax_inboxwp_get_domain', [ $this, 'get_domain' ] );
        add_action( 'wp_ajax_inboxwp_verify_dkim', [ $this, 'inboxwp_verify_dkim' ] );
        add_action( 'wp_ajax_inboxwp_verify_return_path', [ $this, 'inboxwp_verify_return_path' ] );
        add_action( 'wp_ajax_inboxwp_delete_signature', [ $this, 'inboxwp_delete_signature' ] );
        add_action( 'wp_ajax_inboxwp_delete_domain', [ $this, 'inboxwp_delete_domain' ] );
        add_action( 'wp_ajax_inboxwp_add_signature', [ $this, 'inboxwp_add_signature' ] );
        add_action( 'wp_ajax_inboxwp_resend_confirmation', [ $this, 'inboxwp_resend_confirmation' ] );
        add_action( 'wp_ajax_inboxwp_update_signature', [ $this, 'inboxwp_update_signature' ] );
        add_action( 'wp_ajax_inboxwp_set_signature_added', [ $this, 'inboxwp_set_signature_added' ] );
        add_action( 'wp_ajax_inboxwp_check_signature_presence', [ $this, 'inboxwp_check_signature_presence' ] );
    }

    /**
     * Added domain to postmark
     *
     * @return void
     */
    public function add_domain() {
        $this->checkNonce();

        $response = AppApi::instance()->post(
            '/sending-domains', [
				'domain' => sanitize_text_field( $_POST['domain'] ),
			]
        );
        if ( is_wp_error( $response ) ) {
            wp_send_json_error( [ 'message' => $response->get_error_message() ], $response->get_error_data()['status'] );
        }

        $domain = $response['domain'];
        wp_send_json_success( [ 'message' => __( "Domain {$domain['name']} was added successfully", 'inboxwp' ) ] );
    }

    /**
     * Fetch sending signature from postmark
     *
     * @return void
     */
    public function get_signature() {
        $this->callApi( 'get', '/sending-signatures' );
    }

    /**
     * Fetch sending domain from postmark
     *
     * @return void
     */
    public function get_domain() {
        $this->callApi( 'get', '/sending-domains' );
    }

    /**
     * verify dkim for a domain
     *
     * @return void
     */
    public function inboxwp_verify_dkim() {
        $this->callApi( 'get', "/sending-domains/verify-dkim/{$_POST['domain_id']}" );
    }

    public function inboxwp_verify_return_path() {
        $this->callApi( 'get', "/sending-domains/verify-return-path/{$_POST['domain_id']}" );
    }

    /**
     * Delete signature from postmark
     *
     * @return void
     */
    public function inboxwp_delete_signature() {
        $this->callApi( 'delete', "/sending-signatures/{$_POST['signature_id']}" );
    }

    public function inboxwp_delete_domain() {
        $this->callApi( 'delete', "/sending-domains/{$_POST['domain_id']}" );
    }

    /**
     * Added signature to postmark
     *
     * @return void
     */
    public function inboxwp_add_signature() {
        $this->callApi(
            'post', '/sending-signatures', [
				'email' => sanitize_text_field( $_POST['email'] ),
				'replay_to_email' => sanitize_text_field( $_POST['replay_to_email'] ),
				'from_name' => sanitize_text_field( $_POST['from_name'] ),
            ]
		);
    }

    /**
     * Resend confirmation email
     *
     * @return void
     */
    public function inboxwp_resend_confirmation() {
        $this->callApi( 'get', "/sending-signatures/resent/{$_POST['signature_id']}" );
    }

    /**
     * Update signature
     *
     * @return void
     */
    public function inboxwp_update_signature() {
        $replay_to_email = sanitize_text_field( $_POST['reply_to_email'] );
        $this->callApi(
            'put', "/sending-signatures/{$_POST['signature_id']}", [
				'reply_to_email' => $replay_to_email ?: '',
				'name' => sanitize_text_field( $_POST['name'] ),
			]
        );
    }

    /**
     * Update signature
     *
     * @return void
     */
    public function inboxwp_set_signature_added() {
        $value = sanitize_text_field( $_POST['confirmation'] );
        inboxwp_set_signature_added( $value );
        wp_send_json_success( [ 'message' => __( 'Signature presence updated successfully', 'inboxwp' ) ] );
    }

    public function inboxwp_check_signature_presence() {
        $signature = inboxwp_signature_added() == 'true' ? true : false;
        wp_send_json_success( [ 'signature' => $signature ] );
    }
}
