<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\Tag;
use App\Models\TrainingSession;
use App\Models\TrainingSessionTag;
use App\Models\Type;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
             'name' => 'competitor1',
             'email' => 'competitor1@skill17.com',
            'password' => bcrypt('demopass1')
        ]);

        \App\Models\User::factory()->create([
            'name' => 'competitor2',
            'email' => 'competitor2@skill17.com',
            'password' => bcrypt('demopass2')
        ]);

        Type::factory()->create([
            'name' => 'Competition'
        ]);

        Type::factory()->create([
            'name' => 'Training'
        ]);

        Tag::factory()->create([
            'tag' => 'Back-End'
        ]);

        Tag::factory()->create([
            'tag' => 'DB'
        ]);

        Tag::factory()->create([
            'tag' => 'Authentication'
        ]);

        Tag::factory()->create([
            'tag' => 'Admin-area'
        ]);

        Category::factory()->create([
            'name' => 'Back-End'
        ]);

        Category::factory()->create([
            'name' => 'Frontend'
        ]);

        Category::factory()->create([
            'name' => 'Design'
        ]);

        Category::factory()->create([
            'name' => 'Project management'
        ]);

        TrainingSession::factory(12)->create();

        TrainingSessionTag::factory(25)->create();
    }
}
