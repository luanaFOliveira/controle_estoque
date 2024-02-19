<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipRequestRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'observation' => 'string|nullable',
            'equipment_id' => 'required|int',
            'user_id' => 'required|int',
            'request_status_id' => 'int',
            'request_motive_id' => 'required|int',
            'returned_at' => 'date'
        ];
    }
}
