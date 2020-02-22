<?php

namespace App\Models\Admin\Category;

use Illuminate\Database\Eloquent\Model;
use App\Models\Admin\Product\ProductModel;

class CategoryModel extends Model
{
    /**
     * [Use specified name for table]
     *
     * @var string
     */
    protected $table = 'category';

    /**
     * The attributes that are hidden in collection.
     *
     * @var array
     */
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * The attributes that are guarded.
     *
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * This method will return products of this category
     *
     * @return producta
     */
    public function products()
    {
        return $this->hasMany(ProductModel::class, 'category_id');
    }
}
