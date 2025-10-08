<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Post;
use App\Models\User;


class Comment extends Model
{
    protected $fillable = [
        'postId', 'authorId', 'body', 'createdAt', 'status'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class, 'postId');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'authorId');
    }
}
