<?php

namespace App\Http\Controllers\Admin\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Blogs\Blogs;
use App\Models\Videos\Videos;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.dashboard.index');
    }

    public function totalCounts()
    {
        $totalBlogs = Blogs::count();
        $totalVideos = Videos::count();
        $totalMostViewBlogs = Blogs::where('is_most_view', 1)->count();
        $totalTrendingBlogs = Blogs::where('is_trending', 1)->count();

        return [
            'totalBlogs' => $totalBlogs,
            'totalVideos' => $totalVideos,
            'totalMostViewBlogs' => $totalMostViewBlogs,
            'totalTrendingBlogs' => $totalTrendingBlogs,
        ];
    }
}