<?php

namespace App\Http\Controllers\Website;

use Carbon\Carbon;
use App\Models\Blogs\Blogs;
use Illuminate\Http\Request;
use App\Models\Videos\Videos;
use App\Models\Category\Category;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class WebsiteController extends Controller
{
    public function homePage()
    {
        return view('website.home.index');
    }

    public function articlePage(Blogs $blog)
    {
        return view('website.article.index')->with(['blogId' => $blog->id, 'categoryId' => $blog->category_id]);
    }

    public function categoryPage(Category $category)
    {
        return view('website.category.index')->with(['categoryId' => $category->id, 'categoryName' => $category->name]);
    }

    public function allArticlePage()
    {
        return view('website.allarticle.index');
    }

    public function getCategoryList()
    {
        return Category::select('id', 'name')->latest('created_at')->get();
    }

    public function getVideoList()
    {
        $videos = Videos::latest('created_at')->with('user')->take(8)->get();

        $data = [];

        foreach ($videos as $key => $video) {
            $data[$key]['id'] = $video->id;
            $data[$key]['user'] = $video->user->name;
            $data[$key]['name'] = $video->name;
            $data[$key]['video_url'] = $video->video_url;
            $data[$key]['date'] = Carbon::createFromTimeStamp(strtotime($video->created_at))->diffForHumans();
        }

        return $data;
    }

    public function getTopHeadingList()
    {
        $blogs = Blogs::where('is_trending', 1)->latest('created_at')->get();

        $data = [];

        foreach ($blogs as $key => $blog) {
            $data[$key]['id'] = $blog->id;
            $data[$key]['name'] = $blog->name;
            $data[$key]['content'] = $blog->content;
            $data[$key]['image'] = Storage::url('images/blog/' . $blog->image);
            $data[$key]['user'] = $blog->user->name;
            $data[$key]['date'] = Carbon::createFromTimeStamp(strtotime($blog->created_at))->diffForHumans();
        }

        return $data;
    }

    public function getTrendingVideos()
    {
        $videos = Videos::where('is_trending', 1)->with('user')->latest('created_at')->get();

        $data = [];

        foreach ($videos as $key => $video) {
            $data[$key]['id'] = $video->id;
            $data[$key]['user'] = $video->user->name;
            $data[$key]['name'] = $video->name;
            $data[$key]['video_url'] = $video->video_url;
            $data[$key]['date'] = Carbon::createFromTimeStamp(strtotime($video->created_at))->diffForHumans();
        }

        return $data;
    }

    public function getRandomArticle()
    {
        $blogs = Blogs::all()->random(8);

        $data = [];

        foreach ($blogs as $key => $blog) {
            $data[$key]['id'] = $blog->id;
            $data[$key]['name'] = $blog->name;
            $data[$key]['content'] = $blog->content;
            $data[$key]['image'] = Storage::url('images/blog/' . $blog->image);
            $data[$key]['user'] = $blog->user->name;
            $data[$key]['date'] = Carbon::createFromTimeStamp(strtotime($blog->created_at))->diffForHumans();
        }

        return $data;
    }

    public function getRelatedArticle(Category $category)
    {
        $blogs = $category->blogs;

        $data = [];

        foreach ($blogs as $key => $blog) {
            $data[$key]['id'] = $blog->id;
            $data[$key]['name'] = $blog->name;
            $data[$key]['content'] = $blog->content;
            $data[$key]['image'] = Storage::url('images/blog/' . $blog->image);
            $data[$key]['date'] = Carbon::createFromTimeStamp(strtotime($blog->created_at))->diffForHumans();
        }

        return $data;
    }

    public function getLatestArticle()
    {
        $blogs = Blogs::latest('created_at')->take(3)->get();

        $data = [];

        foreach ($blogs as $key => $blog) {
            $data[$key]['id'] = $blog->id;
            $data[$key]['name'] = $blog->name;
            $data[$key]['image'] = Storage::url('images/blog/' . $blog->image);
            $data[$key]['user'] = $blog->user->name;
            $data[$key]['content'] = $blog->content;
            $data[$key]['date'] = Carbon::createFromTimeStamp(strtotime($blog->created_at))->diffForHumans();
        }

        return $data;
    }

    public function getcategoryWiseArticle()
    {
        $blogs = Blogs::all()->random(8);

        $data = [];

        foreach ($blogs as $key => $blog) {
            $data[$key]['id'] = $blog->id;
            $data[$key]['name'] = $blog->name;
            $data[$key]['category_name'] = $blog->category->name;
            $data[$key]['image'] = Storage::url('images/blog/' . $blog->image);
            $data[$key]['user'] = $blog->user->name;
            $data[$key]['content'] = $blog->content;
            $data[$key]['date'] = Carbon::createFromTimeStamp(strtotime($blog->created_at))->diffForHumans();
        }

        $data = $this->groupBy('category_name', $data);

        return $data;
    }


    public function getArticle(Blogs $blog)
    {

        $data['id'] = $blog->id;
        $data['name'] = $blog->name;
        $data['category_name'] = $blog->category->name;
        $data['content'] = $blog->content;
        $data['image'] = Storage::url('images/blog/' . $blog->image);
        $data['user'] = $blog->user->name;
        $data['date'] = Carbon::createFromTimeStamp(strtotime($blog->created_at))->diffForHumans();

        return $data;
    }

    public function getAllArticle()
    {
        return Blogs::select('id', 'name')->get();
    }

    /**
     * Function that groups an array of associative arrays by some key.
     *
     * @param {String} $key Property to sort by.
     * @param {Array} $data Array that stores multiple associative arrays.
     */
    function groupBy($key, $data)
    {
        $result = array();

        foreach ($data as $val) {
            if (array_key_exists($key, $val)) {
                $result[$val[$key]][] = $val;
            } else {
                $result[""][] = $val;
            }
        }

        return $result;
    }
}