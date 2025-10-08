<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Post;

class PostCategory extends Model
{
    protected $fillable = [
        'postId', 'categoryId'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class, 'postId');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId');
    }
}
