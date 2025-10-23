<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Media;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $cat)
    {
        $posts = Post::with('comments')->with('author')->with('media')->orderByDesc('id')->get();
        if($cat != "0") $posts = Post::with('comments')->with('author')->with('media')->with('postCategory')->where('categoryId', $cat)->orderByDesc('id')->get();
        return response( $posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post = Post::create(['title'=>$request->input('title'),
        'slug' => $request->input('slug'),
        'content' => $request->input('content'),
        'authorId' => $request->input('authorId'),
        'publishedAt' => $request->input('publishedAt'),
        'status' => $request->input('status')]);

        PostCategory::create(['postId'=>$post->id, 'categoryId' => $request->input('categoryId')]);
        if($request->hasFile('image'))
        {$file = $request->file('image');

        $filename =  $post->slug . '.' . $file->getClientOriginalExtension();

        $file->storeAs('uploads', $filename, 'public');

        $type = explode('/', $file->getMimeType())[0];

        Media::create(['postId'=>$post->id, 'filePath'=>"image/".$filename, 'kind'=>$type, 'uploadedAt'=>$post->publishedAt]);}
        


        
        return response(["message"=>'Post was created'], 201);
        

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with('comments')->with('author')->with('media')->where('slug', $id)->first();
        if($post){return response( $post, 200);}
        else return response(["message"=>'Post not found'], 404);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::find($id);
        if($post){
        $post->title = $request->input('title');
        $post->slug = $request->input('slug');
        $post->content = $request->input('content');
        $post->authorId = $request->input('author.id');
        $post->publishedAt = $request->input('publishedAt');
        $post->status = $request->input('status');
        
        $post->save();
        return response(["message"=>'Post was updated'], 201);}
        else return response(["message"=>'Post not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)//not working
    {
        $post = Post::find($id);
        if($post){
            $post->delete();
            return response(["message"=>'Post was deleted'], 200);
        }
        else return response(["message"=>'Post not found'], 404);
        
    }
}
