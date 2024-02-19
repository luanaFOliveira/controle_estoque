<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email',
            'password' => 'sometimes|nullable|min:5|confirmed',
            'is_admin' => 'sometimes|required|boolean',
            'sectors' => 'sometimes|array',
        ];
    }
}
