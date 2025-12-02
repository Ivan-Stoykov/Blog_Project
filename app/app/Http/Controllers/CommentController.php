<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\BannedWords;
use Validator;

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
        $validator = Validator::make($request->all(), [
            'body' => 'required|min:1',
        ]);
        if($validator->fails()){
            return response(["ValidationError"=>$validator->errors()], 400);       
        }
        $flag = false;
        $body = $request->input('body');
        $arr = explode(' ', $body);
        $bannedWords = array_values(BannedWords::pluck('word')->toArray());
        for($i = 0; $i < count($arr); $i++)
        {
            if(in_array($arr[$i], $bannedWords)) $flag = true;
        }
        
        if($flag == false){
            Comment::create(['postId'=>$request->input('postId'),
            'authorId' => $request->input('authorId'),
            'body' => $request->input('body'),
            'createdAt' => $request->input('createdAt'),
            'status' => $request->input('status')]);
        
            $comment = Comment::latest()->with('author')->first();
            return response($comment, 201);
        }
        else return response(["message"=>"Comment contains banned word!!"], 405);

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
        $comment = Comment::find($id);
        if($comment){
            $comment->delete();
            return response(["message"=>'comment was deleted'], 200);
        }
        else return response(["message"=>'comment not found'], 404);
    }
}
