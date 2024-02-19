<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipmentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'equipment_type' => 'required|string',
            'equipment_brand' => 'required|string',
            'sector' => 'required|string',
        ];
    }
}
