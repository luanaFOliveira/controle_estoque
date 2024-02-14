<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $userId = $this->route('user');
        return [
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email',
            'password' => 'sometimes|required|min:5|confirmed',
            'is_admin' => 'sometimes|required|boolean',
            'sectors' => 'sometimes|array',
            'equipments' => 'sometimes|array',
        ];
    }
}
