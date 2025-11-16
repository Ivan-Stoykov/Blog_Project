<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\PostCategory;
use App\Models\Post;
use Symfony\Component\HttpFoundation\Response;

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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Category::create(['name'=>$request->input('name'),
        'slug' => $request->input('slug'),]);
        
        $comment = Category::latest()->first();
        return response($comment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $category)
    {
        $posts = PostCategory::with('post.author')->with('category')
        ->whereHas('category', function($q) use ($category)
        {
            $q->where('slug', $category);
        })->paginate(10);

        return response( $posts, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
