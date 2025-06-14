<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Students extends Authenticatable
{
    //
    protected $table = 'students';

    protected $fillable = [
        'student_num',
        'name',
        'email',
        'password',
        'student_bio',
        'cv',
        'faculty',
        'course',
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
}
