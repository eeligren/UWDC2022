<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrainingSessionCreateRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date' => 'required',
            'type_id' => 'sometimes',
            'category_id' => 'sometimes',
            'new_category' => 'sometimes',
            'new_type' => 'sometimes',
            'time_spent' => 'required',
            'notes' => 'sometimes',
            'tags' => 'required'
        ];
    }
}
