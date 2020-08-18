<?php

namespace App\Http\Requests\Category;

use Illuminate\Support\Facades\Input;
use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        $rules = [
            'description' => [
                'required',
                'max:5000'
            ],
        ];

        if (Input::get('method') == 'post') {
            $rules['name'] =  [
                'required',
                'unique:category,name',
            ];
            $rules['image'] = [
                'required',
                'mimes:jpeg,bmp,png,gif,jpg',
                'max:5000'
            ];
        } elseif (Input::get('method') == 'put') {

            $rules['image'] = [
                'required',
            ];
            $rules['name'] =  [
                'unique:category,name,' . $this->category->id,
                'required',
            ];
        }
        return $rules;
    }
}