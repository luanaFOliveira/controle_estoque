<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipmentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'equipment_type' => 'min:3|required|string',
            'equipment_brand' => 'min:2|required|string',
            'sector' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O campo nome é obrigatório.',
            'name.string' => 'O campo nome deve ser uma string.',

            'equipment_type.min' => 'O campo tipo de equipamento deve ter no mínimo 3 caracteres.',
            'equipment_type.required' => 'O campo tipo de equipamento é obrigatório.',
            'equipment_type.string' => 'O campo tipo de equipamento deve ser uma string.',

            'equipment_brand.min' => 'O campo marca de equipamento deve ter no mínimo 2 caracteres.',
            'equipment_brand.required' => 'O campo marca de equipamento é obrigatório.',
            'equipment_brand.string' => 'O campo marca de equipamento deve ser uma string.',

            'sector.required' => 'O campo setor é obrigatório.',
            'sector.string' => 'O campo setor deve ser uma string.',
        ];
    }
}
