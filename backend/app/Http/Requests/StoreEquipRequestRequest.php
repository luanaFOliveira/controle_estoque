<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'observation'=>'string',
            'equipment_id'=>'required|int',
            'user_id'=>'required|int',
            'request_status_id'=>'int',
            'request_motive_id'=>'int',
            'returned_at' => 'date'
        ];
    }
}
