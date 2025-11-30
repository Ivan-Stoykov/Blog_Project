<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Media;
use App\Models\PostTag;
use App\Models\Tag;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('author')->with('postCategories')->orderByDesc('id');
        return response( $posts->paginate(10), 200);
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
        
        $tags = json_decode($request->input('tags'));

        if(count($tags) > 0)
        {
            for($i = 0; $i < count($tags); $i++)
            {
                if(!Tag::where('name', $tags[$i])->exists())
                {
                    $tag = Tag::create(['name'=>$tags[$i], 'slug'=>str_replace(' ', '_', $tags[$i])]);
                    PostTag::create(['postId'=>$post->id, 'tagId'=>$tag->id]);
                }
                
            }
        }

        
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
    public function showById(string $id)
    {
        $post = Post::with('comments')->with('author')->with('media')->with('postTags')->where('Id', $id)->first();
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
        if($request->user()->can('update', $post)) 
            {
                $post->save();
                return response(["message"=>'Post was updated'], 201);
            }
        else return response(['message'=>'Unautharized'], 401);
        }
        else return response(["message"=>'Post not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);
        if($post){
            if(Gate::authorize('delete', $post))
            $post->delete();
            return response(["message"=>'Post was deleted'], 200);
        }
        else return response(["message"=>'Post not found'], 404);
        
    }

    public function PersonalDrafts(string $id)
    {
        $posts = Post::with('comments')->with('author')->where('status', 'draft')->where('authorId', $id)
        ->orderByDesc('id')->paginate(10);
        if($posts){return response( $posts, 200);}
        else return response(["message"=>'Posts not found'], 404);
    }
}
