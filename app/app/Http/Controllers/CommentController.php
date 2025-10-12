<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $comments = Comment::with('author')->where('postId', $id)->orderByDesc('id')->get();
        return response( $comments, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Comment::create(['postId'=>$request->input('postId'),
        'authorId' => $request->input('authorId'),
        'body' => $request->input('body'),
        'createdAt' => $request->input('createdAt'),
        'status' => $request->input('status')]);
        
        $comment = Comment::latest()->with('author')->first();
        return response($comment, 201);
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
