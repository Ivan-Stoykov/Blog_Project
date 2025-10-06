<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'postId', 'authorId', 'body', 'createdAt', 'status'
    ];
}
