<?php

namespace App\Models\Category;

use Illuminate\Database\Eloquent\Model;
use App\Models\Blogs\Blogs;
use App\Models\Videos\Videos;

class Category extends Model
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
     * This method will return blogs  of this category
     *
     * @return producta
     */
    public function blogs()
    {
        return $this->hasMany(Blogs::class, 'category_id');
    }

    /**
     * This method will return videos of this category
     *
     * @return producta
     */
    public function videos()
    {
        return $this->hasMany(Videos::class, 'category_id');
    }
}