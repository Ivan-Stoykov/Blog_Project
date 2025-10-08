<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('author')->with('comments')->with('media')->get();
        return response( $posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Post::create(['title'=>$request->input('title'),
        'slug' => $request->input('slug'),
        'content' => $request->input('content'),
        'authorId' => $request->input('author.id'),
        'publishedAt' => $request->input('publishedAt'),
        'status' => $request->input('status')]);
        
        return response('Post was created', 201);
        

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
