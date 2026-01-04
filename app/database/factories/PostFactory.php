<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence;
        return [
            'title' => $title,
            'slug' => str_replace(" ", "-", $title),
            'content' => $this->faker->paragraphs(3, true),
            'status' => 'published',
            'authorId' => User::factory(),
            'publishedAt'=>now()->toDateTimeString(),
           
        ];
    }
}
