<?php

namespace App\Http\Requests\Video;

use Illuminate\Support\Facades\Input;
use Illuminate\Foundation\Http\FormRequest;

class VideoRequest extends FormRequest
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
            'video_url' => [
                'required'
            ]
        ];
        if (Input::get('method') == 'post') {
            $rules['name'] =  [
                'required',
                'unique:videos,name',
            ];
        } elseif (Input::get('method') == 'put') {

            $rules['name'] =  [
                'unique:videos,name,' . $this->video->id,
                'required',
            ];
        }
        return $rules;
    }
}