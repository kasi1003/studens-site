<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        Student::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'university' => 'NUST',
        ]);
    }
}
