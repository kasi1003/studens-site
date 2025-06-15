<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\AppliedInternship;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Authenticatable
{
    use HasFactory;

    protected $table = 'students';

    protected $fillable = [
        'student_num',
        'name',
        'email',
        'password',
        'student_bio',
        'faculty',
        'course',
        'specialization',
        'cv',
        'nust_letter',
        'profile_picture'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'cv',
        'nust_letter',
        'profile_picture',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relationships
    public function applications()
    {
        return $this->hasMany(AppliedInternship::class, 'student_id');
    }
}