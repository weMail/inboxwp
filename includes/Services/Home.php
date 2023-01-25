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
        return AppApi::instance()->get('/stats', [], ['timeout' => 2000]);
    }
}