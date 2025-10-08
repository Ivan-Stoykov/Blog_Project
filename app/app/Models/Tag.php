<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PostTag;

class Tag extends Model
{
    protected $fillable = [
        'name', 'slug'
    ];

    public function postTag()
    {
        return $this->hasMany(PostTag::class, 'tagId');
    }
}
