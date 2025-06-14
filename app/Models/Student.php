<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Authenticatable
{
    use HasFactory;

    protected $guard = 'student';

    protected $fillable = [
        'id', 'name', 'email', 'password', 'university',
    ];

    protected $hidden = ['password'];

    public $incrementing = false; // Since student ID is custom

    protected $primaryKey = 'id';
}
