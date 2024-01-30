<?php

namespace App\Observers;

use App\Models\Sector;
use App\Models\UserSector;

class SectorObserver
{

    public function deleted(Sector $sector):void
    {
        UserSector::where('sector_id', $sector->sector_id)->delete();
    }

}
