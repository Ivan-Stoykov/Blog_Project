<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'postId', 'filePath', 'kind', 'uploadedAt'
    ];
}
