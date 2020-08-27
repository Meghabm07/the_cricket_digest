<?php

namespace App\Http\Requests\Blog;

use Illuminate\Support\Facades\Input;
use Illuminate\Foundation\Http\FormRequest;

class BlogRequest extends FormRequest
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
            'category' => [
                'required',
            ],
            'content' => [
                'required',
            ],
            'mainName' => 'required'
        ];

        if (Input::get('method') == 'post') {
            $rules['name'] =  [
                'required',
                'unique:blogs,name',
            ];
            $rules['image'] = [
                'required',
                'mimes:jpeg,bmp,png,gif,jpg',
                'max:5000'
            ];
        } elseif (Input::get('method') == 'put') {

            $rules['name'] =  [
                'unique:blogs,name,' . $this->blog->id,
                'required',
            ];
        }
        return $rules;
    }
}