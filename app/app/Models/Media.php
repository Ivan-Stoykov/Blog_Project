<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class Media extends Model
{
    protected $fillable = [
        'postId', 'filePath', 'kind', 'uploadedAt'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class, 'postId');
    }
}
