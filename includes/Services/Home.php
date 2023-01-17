<?php


namespace WeDevs\Inboxwp\Services;


use WeDevs\Inboxwp\Api\AppApi;
use WeDevs\Inboxwp\Traits\Singleton;

class Home
{
    use Singleton;

    public function getStats()
    {
        $apiKey = inboxwp_api_key();
        if ($apiKey) {
            $stats = AppApi::instance()->get('/' . site_hash() . '/stats', [], ['timeout' => 2000]);
            error_log(print_r($stats, 1));
            return [
                'key' => $apiKey
            ];
        }
        return false;
    }
}