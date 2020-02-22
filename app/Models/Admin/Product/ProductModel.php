<?php

namespace App\Models\Admin\Product;

use Illuminate\Database\Eloquent\Model;
use App\Models\Admin\Category\CategoryModel;

class ProductModel extends Model
{
    /**
     * [Use specified name for table]
     *
     * @var string
     */
    protected $table = 'product';

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
    public function category()
    {
        return $this->belongsTo(CategoryModel::class, 'category_id');
    }
}
