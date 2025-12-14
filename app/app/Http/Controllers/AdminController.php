<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostCategory;
use App\Models\PostTag;
use App\Models\Post;
use App\Models\User;

class AdminController extends Controller
{
    public function showByPostCategory(string $category)
    {
        $posts = PostCategory::with('post.author')->with('category')
        ->whereHas('category', function($q) use ($category)
        {
            $q->where('slug', $category);
        })->paginate(10);

        return response( $posts, 200);
    }

    public function showByPostTag(string $tag)
    {
        $posts = PostTag::with('post.author')->with('tag')
        ->whereHas('tag', function($q) use ($tag)
        {
            $q->where('slug', $tag);
        })->paginate(10);

        return response( $posts, 200);
    }

    public function showByPostAuthor(string $author)
    {
        $posts = Post::with('author')->whereHas('author', function($q) use ($author)
        {
            $q->where('name', $author);
        })->paginate(10);

        return response( $posts, 200);
    }

    public function showByPostPublishedAt(string $period)
    {
        $dates = explode('|',$period);
        $posts = Post::with('author')->whereBetween('publishedAt', [$dates[0], $dates[1]])->paginate(10);
        
        return response( $posts, 200);
    }

    public function showNumberPostsByAuthor()
    {
        $posts = User::withCount([
            'posts',

            'posts as draft_posts_count' => function ($q) {
                $q->where('status', 'draft');
            },

            'posts as published_posts_count' => function ($q) {
                $q->where('status', 'published');
            },
        ])
        ->having('posts_count', '>', 0)
        ->paginate(10);
        
        return response( $posts, 200);
    }
}
