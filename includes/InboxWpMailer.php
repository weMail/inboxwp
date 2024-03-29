<?php

namespace WeDevs\Inboxwp;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;
use WeDevs\Inboxwp\API\AppApi;
use WeDevs\Inboxwp\Services\IgnoreEmail\SendingPermission;

class InboxWpMailer extends PHPMailer {


    /**
     * @var $phpmailer \PHPMailer|\PHPMailer\PHPMailer\PHPMailer
     */
    protected $phpmailer;

    /**
     *  Format Email Addresses
     *
     * @param $address
     * @return array
     */
    protected function formatEmailAddress( $address ) {
        return array_map(
            function ( $address ) {
                return $address[0];
            },
            $address
        );
    }

    /**
     * Set Mailer
     *
     * @param $mailer
     */
    public function setPHPMailer( $mailer ) {
        $this->phpmailer = $mailer;
    }

    /**
     * Attempt to send email by inboxwp app
     *
     * @return mixed
     */
    protected function attemptToSend() {
        return AppApi::instance()->post(
            '/email/send',
            array(
                'to' => $this->formatEmailAddress( $this->phpmailer->getToAddresses() ),
                'bcc' => $this->phpmailer->getBccAddresses(),
                'cc' => $this->phpmailer->getCcAddresses(),
                'subject' => $this->phpmailer->Subject,
                'message' => $this->phpmailer->Body,
                'type' => $this->phpmailer->ContentType,
                'reply_to' => $this->phpmailer->getReplyToAddresses(),
                'attachments' => $this->getAttachments(),
            )
        );
    }

    /**
     * Overwrite phpmailer send method
     *
     * @throws PHPMailerException
     */
    public function send() {
        if ( $this->needToIgnore() ) {
            return $this->phpmailer->send();
        }

        $response = $this->attemptToSend();

        if ( is_wp_error( $response ) ) {
            throw new PHPMailerException( $response->get_error_message() );
        }

        if ( isset( $response['success'] ) && ! inboxwp_validate_boolean( $response['success'] ) ) {
            throw new PHPMailerException( __( 'Could not send transactional email', 'inboxwp' ) );
        }

        return true;
    }

    protected function formatAttachment( $attachment ) {
        $upload_dir = wp_upload_dir();
        return $upload_dir['url'] . '/' . $attachment[1];
    }

    public function getAttachments() {
        $attachments = $this->phpmailer->getAttachments();

        // Format the attachments, per service requirement.
        $attachments = array_map( [ $this, 'formatAttachment' ], $attachments );

        return $attachments;
    }

    protected function needToIgnore() {
        return SendingPermission::instance()->ignoredPlugin();
    }
}
