<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PostStoreTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_a_user_can_create_a_post_with_image_and_tags()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $payload = [
            'title' => 'New post',
            'slug' => 'New-Post',
            'content' => 'Content with more than 3 characters',
            'authorId' => $user->id,
            'status' => 'published',
            'categoryId' => $category->id,
            'publishedAt' => now()->toDateTimeString(),
            'tags' => json_encode(['Laravel', 'Testing']),
            'image' => UploadedFile::fake()->image('post-image.jpg')
        ];

        $this->actingAs($user);

        $response = $this->postJson('/api/posts', $payload);

        $response->assertStatus(201);
        $response->assertJson(['message' => 'Post was created']);

        $this->assertDatabaseHas('posts', [
            'title' => 'New post',
            'authorId' => $user->id
        ]);

        $this->assertDatabaseHas('post_categories', [
            'categoryId' => $category->id
        ]);

        $filename = 'New-post.jpg';
        Storage::disk('public')->assertExists('uploads/' . $filename);
        
        $this->assertDatabaseHas('tags', ['name' => 'Laravel']);
    }

    /** @test */
    public function test_it_fails_validation_if_title_is_missing()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $response = $this->postJson('/api/posts', []);

        $response->assertStatus(400);
        $response->assertJsonStructure(['ValidationError' => ['title', 'content', 'authorId']]);
    }

    public function test_returns_only_published_posts_with_pagination()
    {
        $author = User::factory()->create();
        $this->actingAs($author);
        Post::factory()->count(5)->create([
            'status' => 'published',
            'authorId' => $author->id,
        ]);

        Post::factory()->create([
            'status' => 'draft',
            'authorId' => $author->id,
        ]);

        $response = $this->getJson('/api/posts'); 

        $response->assertStatus(200);

        $response->assertJsonCount(4, 'data');
        
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id', 
                    'status', 
                    'author', 
                    'post_categories', 
                    'media'
                ]
            ]
        ]);

        foreach ($response->json('data') as $post) {
            $this->assertEquals('published', $post['status']);
        }
    }
}
