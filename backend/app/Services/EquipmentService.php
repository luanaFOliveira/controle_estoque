<?php

namespace App\Services;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Resources\EquipmentResource;
use App\Http\Resources\HistoryResource;
use App\Models\Equipment;
use App\Models\EquipmentBrand;
use App\Models\EquipmentRequest;
use App\Models\EquipmentType;
use App\Models\Sector;
use App\Models\UserEquipment;
use Illuminate\Support\Facades\DB;

class EquipmentService
{
    public function upsertEquipment(StoreEquipmentRequest $request, ?Equipment $equipment = null): EquipmentResource
    {
        return DB::transaction(function () use ($request, $equipment) {
            if ($equipment === null) {
                $equipment = $this->createEquipment($request);
            } else {
                $equipment = $this->updateEquipment($request, $equipment);
            }

            return $equipment;
        });
    }

    private function updateEquipmentRelations(&$data)
    {
        $sectorName = $data['sector'];
        $sector = Sector::firstOrCreate(['name' => $sectorName]);
        $data['sector_id'] = $sector->sector_id;

        $brandName = $data['equipment_brand'];
        $brand = EquipmentBrand::firstOrCreate(['name' => $brandName]);
        $data['equipment_brand_id'] = $brand->equipment_brand_id;

        $typeName = $data['equipment_type'];
        $type = EquipmentType::firstOrCreate(['name' => $typeName]);
        $data['equipment_type_id'] = $type->equipment_type_id;
    }

    private function generateEquipmentCode(): string
    {
        do {
            $letters = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 2);
            $numbers = substr(str_shuffle("0123456789"), 0, 4);
            $equipmentCode = $letters . '-' . $numbers;

            $query = Equipment::where('equipment_code', $equipmentCode)->first();
        } while ($query != null);

        return $equipmentCode;
    }

    private function createEquipment(StoreEquipmentRequest $request): EquipmentResource
    {
        $data = $request->validated();
        $data['is_at_office'] = true;
        $data['is_available'] = true;

        $equipment_code = $this->generateEquipmentCode();
        $data['equipment_code'] = $equipment_code;

        $this->updateEquipmentRelations($data);

        $equipment = Equipment::create($data);

        return EquipmentResource::make($equipment);
    }

    public function returnEquipment(Equipment $equipment): HistoryResource
    {
        $userEquipment = UserEquipment::where('equipment_id', $equipment->equipment_id)
            ->whereNull('returned_at')
            ->first();
        $userEquipment->returned_at = now();
        $userEquipment->save();

        $equipmentRequest = EquipmentRequest::where('equipment_id', $userEquipment->equipment_id)
            ->where('user_id', $userEquipment->user_id)
            ->whereNull('deleted_at')
            ->first();
        $equipmentRequest->delete();
        
        return HistoryResource::make($userEquipment);
    }

    public function changeEquipmentLocation($equipment_id, $action): array
    {
        $equipment = Equipment::find($equipment_id);
        if ($action === 'home') {
            $equipment->is_at_office = false;
            $message = 'Equipment is now at home';
        } else if ($action === 'office'){
            $equipment->is_at_office = true;
            $message = 'Equipment is now in the office';
        } else{
            return ['message' => 'Invalid action', 'status' => 400];
        }
        $equipment->save();
        return ['message' => $message, 'data' => $equipment];
    }

    private function updateEquipment(StoreEquipmentRequest $request, Equipment $equipment): EquipmentResource
    {
        $data = $request->validated();

        $this->updateEquipmentRelations($data);

        $equipment->update($data);

        return EquipmentResource::make($equipment);
    }

    public function deleteEquipment(Equipment $equipment): void
    {
        $equipment->delete();
    }
}
