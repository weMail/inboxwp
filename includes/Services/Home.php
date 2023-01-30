<?php


namespace WeDevs\Inboxwp\Services;


use WeDevs\Inboxwp\Api\AppApi;
use WeDevs\Inboxwp\Traits\Singleton;

class Home
{
    use Singleton;

    public function getStats()
    {
        if (! inboxwp_api_key()) {
            return false;
        }
        $stats = AppApi::instance()->get('/stats', [], ['timeout' => 2000]);
        if (is_wp_error($stats)) {
            return false;
        }
        return $stats;
    }
}