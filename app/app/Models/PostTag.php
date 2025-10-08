<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tag;
use App\Models\Post;

class PostTag extends Model
{
    protected $fillable = [
        'postId', 'tagId'
    ];

        public function post()
    {
        return $this->belongsTo(Post::class, 'postId');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class, 'tagId');
    }
}
