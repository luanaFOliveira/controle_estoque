<?php

namespace App\Services;

use App\Http\Requests\StoreSectorRequest;
use App\Http\Resources\SectorResource;
use App\Models\Sector;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class SectorService {

    public function upsertSector(StoreSectorRequest $request, ?Sector $sector = null): Sector
    {
        return DB::transaction(function () use ($request, $sector) {
            if ($sector === null) {
                $sector = $this->createSector($request);
            } else {
                $sector = $this->updateSector($request, $sector);
            }

            return $sector;
        });
    }

    private function updateSectorRelations(StoreSectorRequest $request, Sector $sector): void
    {
        $data = $request->validated();

    }

    private function createSector(StoreSectorRequest $request): SectorResource
    {
        $data = $request->validated();

        $sector = Sector::create($data);

        $this->updateSectorRelations($request, $sector);

        return SectorResource::make($sector);
    }

    private function updateSector(StoreSectorRequest $request, Sector $sector): SectorResource
    {
        $data = $request->validated();

        $sector->update($data);

        $this->updateSectorRelations($request, $sector);

        return SectorResource::make($sector);
    }

    public function deleteSector(Sector $sector):void
    {
        $sector->delete();
    }

}
