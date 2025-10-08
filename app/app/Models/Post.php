<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Comment;
use App\Models\Media;
use App\Models\PostCategory;
use App\Models\PostTag;

class Post extends Model
{
    protected $fillable = [
        'title', 'slug', 'content', 'authorId', 'publishedAt', 'status'
    ];

    public function author(){
        return $this->belongsTo(User::class, 'authorId');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'postId');
    }

    public function media()
    {
        return $this->hasMany(Media::class, 'postId');
    }

    public function postCategories()
    {
        return $this->hasMany(PostCategory::class, 'postId');
    }

    public function postTags()
    {
        return $this->hasMany(PostTag::class, 'postId');
    }
}
