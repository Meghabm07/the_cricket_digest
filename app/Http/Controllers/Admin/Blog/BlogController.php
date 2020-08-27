<?php

namespace App\Http\Controllers\Admin\Blog;

use Carbon\Carbon;
use App\Models\Blogs\Blogs;
use Illuminate\Http\Request;
use App\Models\Category\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\BlogRequest;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
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
        return view('admin.blog.index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BlogRequest $request)
    {

        try {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalName();
            // Storage::putFileAs('/images/blog', $image, $imageName);
            $image->move(public_path('storage/images/blog/'), $imageName);

            $blog = Blogs::create([
                'name' => $request->name,
                'image' => $imageName,
                'main_name' => $request->mainName,
                'content' => $request->content,
                'category_id' => $request->category,
                'user_id' => auth()->user()->id
            ]);
            return response()->json(['message' => $blog->name . ' Blog Created Successfully'], 200);
        } catch (\Exception $e) {
            return $e;
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
            $blogDatas = Blogs::with('category', 'user')->where('name', 'like', '%' . $request->keywords . '%')
                ->latest()
                ->paginate($request->rowsCount);

            foreach ($blogDatas as $blog) {
                $blog->image = Storage::url('images/blog/' . $blog->image);
            }
        } else {
            $blogDatas = Blogs::with('category', 'user')->latest()
                ->paginate($request->rowsCount);

            foreach ($blogDatas as $blog) {
                $blog->image = Storage::url('images/blog/' . $blog->image);
            }
        }

        if (!empty($blogDatas)) {
            return $blogDatas;
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
    public function edit(Blogs $blog)
    {
        if ($blog) {
            return [
                'name' => $blog->name,
                'main_name' => $blog->main_name,
                'category' => ['value' => $blog->category->id, 'label' => $blog->category->name],
                'content' => $blog->content,
                'image' => $blog->image,

            ];
        } else {
            return response()->json(['error' => 'Data not found'], 404);
        }
    }

    public function show(Blogs $blog)
    {
        if ($blog) {
            return [
                'name' => $blog->name,
                'main_name' => $blog->main_name,
                'user' => $blog->user->name,
                'category' => $blog->category->name,
                'content' => $blog->content,
                'created_at' => Carbon::createFromTimeStamp(strtotime($blog->created_at))->diffForHumans(),
                'image' => Storage::url('images/blog/' . $blog->image),
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
    public function update(BlogRequest $request, Blogs $blog)
    {
        try {

            if ($request->hasFile('image')) {
                try {

                    Storage::delete('images/blog/' . $blog->image);

                    $image = $request->file('image');
                    $imageName = time() . '.' . $image->getClientOriginalName();
                    // Storage::putFileAs('/images/blog', $image, $imageName);
                    $image->move(public_path('storage/images/blog/'), $imageName);

                    $imageFileName = $imageName;
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Sorry ! Something went wrong']);
                }
            } else {
                $imageFileName = $blog->image;
            }

            $blog->update([
                'name' => $request->name,
                'image' => $imageFileName,
                'content' => $request->content,
                'category_id' => $request->category,
                'main_name' => $request->mainName,
            ]);
            return response()->json(['message' => $blog->name . ' Blog Updated Successfully'], 200);
        } catch (\Exception $e) {
            return $e;
            return response()->json(['error' => 'Something went wrong'], 404);
        }
    }

    public function getCategoryList()
    {
        return Category::select('id as value', 'name as label')->get();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blogs $blog)
    {
        try {
            $name = $blog->name;
            Storage::delete('images/blog/' . $blog->image);
            $blog->delete();
            return response()->json(['message' => $name . ' Blog Deleted Successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something Went Wrong'], 404);
        }
    }

    public function updateTrending(Request $request, Blogs $blog)
    {
        if ($request->isChecked == 1 || $request->isChecked == 0) {
            $blog->update([
                'is_trending' => $request->isChecked
            ]);

            return response()->json(['message' => $blog->name . ' updated Successfully'], 200);
        } else {
            return response()->json(['error' => 'Something went wrong'], 200);
        }
    }
}