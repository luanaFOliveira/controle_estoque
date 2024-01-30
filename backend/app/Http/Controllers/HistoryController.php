<?php

namespace App\Http\Controllers;

use App\Http\Resources\HistoryResource;
use App\Models\UserEquipment;
use Illuminate\Http\Request;
use \Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class HistoryController extends Controller
{
    public function indexUser(Request $request): AnonymousResourceCollection
    {
        $user_id = $request->input('user_id');

        $query = UserEquipment::where('user_id', $user_id);

        return HistoryResource::collection($query->orderBy('created_at','desc')->paginate(10));
    }

    public function indexEquipment(Request $request): AnonymousResourceCollection
    {
        $equipment_id = $request->input('equipment_id');

        $query = UserEquipment::where('equipment_id', $equipment_id);

        return HistoryResource::collection($query->orderBy('created_at','desc')->paginate(10));
    }
}
