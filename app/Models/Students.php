<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Students extends Authenticatable
{
    protected $table = 'students';

    protected $fillable = [
        'student_num',
        'name',
        'email',
        'student_email',
        'password',
        'student_bio',
        'cv',
        'course_id', 
        'nust_letter',
        'profile_picture',
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

    /**
     * A student belongs to a course.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
