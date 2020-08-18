<?php

namespace App\Models\Videos;

use App\User;
use App\Models\Category\Category;
use Illuminate\Database\Eloquent\Model;

class Videos extends Model
{
    /**
     * [Use specified name for table]
     *
     * @var string
     */
    protected $table = 'videos';

    /**
     * The attributes that are hidden in collection.
     *
     * @var array
     */
    protected $fillable = ['is_trending', 'category_id', 'user_id', 'name', 'video_url'];

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