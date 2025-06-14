<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Application;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {  
        Application::create([
            'student_id' => 1,
            'internship_id' => 1,
            'status' => 'pending',
        ]);
    }
}
