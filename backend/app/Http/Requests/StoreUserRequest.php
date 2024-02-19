<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email|unique:user',
            'password' => 'required|min:5|confirmed',
            'is_admin' => 'required|boolean',
            'sectors' => 'array',
        ];
    }
}
