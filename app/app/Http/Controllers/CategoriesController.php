<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\PostCategory;
use App\Models\Post;
use Symfony\Component\HttpFoundation\Response;
use Validator;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::get();
        return response( $categories, 200);

    }
    public function indexPaginate()
    {
        $categories = Category::paginate(10);
        return response( $categories, 200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
        ]);
        if($validator->fails()){
            return response(["ValidationError"=>$validator->errors()], 400);       
        }
        Category::create(['name'=>$request->input('name'),
        'slug' => $request->input('slug'),]);
        
        $category = Category::latest()->first();
        return response($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $category)
    {
        $posts = PostCategory::with('post.author')->with('post.media')->with('post.postCategories.category')->with('category')
        ->whereHas('category', function($q) use ($category)
        {
            $q->where('slug', $category);
        })
        ->whereHas('post', function($q)
        {
            $q->where('status', '!=', 'draft');
        })
        ->paginate(10);

        return response( $posts, 200);
    }

    public function showId(string $id)
    {
        $posts = Category::where('id', $id)->first();

        return response( $posts, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'slug' => 'required|min:3',
        ]);
        if($validator->fails()){
            return response(["ValidationError"=>$validator->errors()], 400);       
        }
        $tag = Category::find($id);
        if($tag){
        $tag->name = $request->input('name');
        $tag->slug = $request->input('slug');
        $tag->save();
        return response(["message"=>"Category edited"]);
         }
        else return response(["message"=>'Category not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        if($category){
            $category->delete();
            return response(["message"=>'Category was deleted'], 200);
        }
        else return response(["message"=>'Category not found'], 404);
    }
}
