<?php

namespace App\Http\Controllers\Admin\Video;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Videos\Videos;
use App\Models\Category\Category;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Video\VideoRequest;

class VideoController extends Controller
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
        return view('admin.video.index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(VideoRequest $request)
    {

        try {
            $video = Videos::create([
                'name' => $request->name,
                'video_url' => $request->video_url,
                'category_id' => $request->category,
                'user_id' => auth()->user()->id,
            ]);
            return response()->json(['message' => $video->name . ' Video Created Successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 404);
        }
    }

    /**
     * Display the all resources.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        if ($request->keywords !== '') {
            $videoDatas = Videos::with('category', 'user')->where('name', 'like', '%' . $request->keywords . '%')
                ->latest()
                ->paginate($request->rowsCount);
        } else {
            $videoDatas = Videos::with('category', 'user')->latest()
                ->paginate($request->rowsCount);
        }

        if (!empty($videoDatas)) {
            return $videoDatas;
        } else {
            return response()->json(['error' => 'Data not found'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Videos $video)
    {
        if ($video) {
            return [
                'name' => $video->name,
                'category' => ['value' => $video->category->id, 'label' => $video->category->name],
                'video_url' => $video->video_url,
            ];
        } else {
            return response()->json(['error' => 'Data not found'], 404);
        }
    }

    public function show(Videos $video)
    {
        if ($video) {
            return [
                'name' => $video->name,
                'category' => $video->category->name,
                'video_url' => $video->video_url,
                'created_at' => Carbon::createFromTimeStamp(strtotime($video->created_at))->diffForHumans(),
            ];
        } else {
            return response()->json(['error' => 'Data not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(VideoRequest $request, Videos $video)
    {
        try {

            $video->update([
                'name' => $request->name,
                'video_url' => $request->video_url,
                'category_id' => $request->category,
            ]);
            return response()->json(['message' => $video->name . ' Video Updated Successfully'], 200);
        } catch (\Exception $e) {

            return response()->json(['error' => 'Something went wrong'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Videos $video)
    {
        try {
            $name = $video->name;
            $video->delete();
            return response()->json(['message' => $name . ' Video Deleted Successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something Went Wrong'], 404);
        }
    }

    public function updateTrending(Request $request, Videos $video)
    {
        if ($request->isChecked == 1 || $request->isChecked == 0) {
            $video->update([
                'is_trending' => $request->isChecked
            ]);

            return response()->json(['message' => $video->name . ' updated Successfully'], 200);
        } else {
            return response()->json(['error' => 'Something went wrong'], 200);
        }
    }
}