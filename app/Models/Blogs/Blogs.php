<?php

namespace App\Models\Blogs;

use App\User;
use App\Models\Category\Category;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model
{
    /**
     * [Use specified name for table]
     *
     * @var string
     */
    protected $table = 'blogs';

    /**
     * The attributes that are hidden in collection.
     *
     * @var array
     */
    protected $fillable = ['content', 'is_most_view', 'is_trending', 'category_id', 'user_id', 'name', 'main_name', 'image'];

    /**
     * This method will return blogs  of this category
     *
     * @return producta
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }


    /**
     * This method will return blogs  of this category
     *
     * @return producta
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}