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

    public function messages(): array
    {
        return [
            'name.required' => 'O campo nome é obrigatório.',
            'email.required' => 'O campo e-mail é obrigatório.',
            'email.email' => 'Por favor, insira um endereço de e-mail válido.',
            'email.unique' => 'Este endereço de e-mail já está associado a uma conta existente. Por favor, utilize um endereço de e-mail diferente.',
            'password.required' => 'O campo senha é obrigatório.',
            'password.min' => 'A senha deve ter no mínimo 5 caracteres.',
            'password.confirmed' => 'A confirmação de senha não corresponde.',
            'is_admin.required' => 'O campo is_admin é obrigatório.',
            'is_admin.boolean' => 'O campo is_admin deve ser booleano.',
            'sectors.array' => 'O campo setores deve ser uma matriz.',
        ];
    }
}
