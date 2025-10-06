<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post_categories', function (Blueprint $table) {
            $table->unsignedBigInteger('postId');
            $table->foreign('postId')->references('id')->on('posts');
            $table->unsignedBigInteger('categoryId');
            $table->foreign('categoryId')->references('id')->on('categories');
            $table->timestamps();
            $table->primary(['postId', 'categoryId']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_categories');
    }
};
