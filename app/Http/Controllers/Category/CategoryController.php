<?php

namespace App\Http\Controllers\Category;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\Admin\Category\CategoryModel;
use App\Http\Requests\Category\CategoryRequest;

class CategoryController extends Controller
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
        return view('user.admin.category.index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
        try {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalName();
            // Storage::putFileAs('/images/category', $image, $imageName);
            $image->move(public_path('storage/images/category/'), $imageName);

            CategoryModel::create([
                'name' => $request->name,
                'image' => $imageName,
                'description' => $request->description,
            ]);
            return response()->json(['message' => 'Category Created Successfully'], 200);
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
        if ($request->keywords !== '') 
        {
            $categoryDatas = CategoryModel::where('name', 'like', '%' . $request->keywords . '%')
                                            ->latest()
                                            ->paginate($request->rowsCount);

            foreach ($categoryDatas as $category) 
            {
                $category->image = Storage::url('images/category/' . $category->image);
            }
        } 
        else 
        {
            $categoryDatas = CategoryModel::latest()
                                            ->paginate($request->rowsCount);

            foreach ($categoryDatas as $category) 
            {
                $category->image = Storage::url('images/category/' . $category->image);
            }
        }

        if (!empty($categoryDatas)) 
        {
            return $categoryDatas;
        } 
        else 
        {
            return response()->json(['error' => 'Data not found'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(CategoryModel $category)
    {
        if ($category) {
            return $category;
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
    public function update(CategoryRequest $request, CategoryModel $category)
    {
        try {

            if ($request->hasFile('image')) {
                try {

                    Storage::delete('images/category/' . $category->image);

                    $image = $request->file('image');
                    $imageName = time() . '.' . $image->getClientOriginalName();
                    // Storage::putFileAs('/images/category', $image, $imageName);
                    $image->move(public_path('storage/images/category/'), $imageName);

                    $imageFileName = $imageName;
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Sorry ! Something went wrong']);
                }
            } else {
                $imageFileName = $category->image;
            }

            $category->update([
                'name' => $request->name,
                'image' => $imageFileName,
                'description' => $request->description,
            ]);
            return response()->json(['message' => 'Category Updated Successfully'], 200);
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
    public function destroy(CategoryModel $category)
    {
        try {
            Storage::delete('images/category/' . $category->image);
            $category->delete();
            return response()->json(['message' => 'Category Deleted Successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something Went Wrong'], 404);
        }
    }
}
