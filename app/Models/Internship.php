<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course',
        'position',
        'educational_requirements',
        'work_description',
        'work_hours',
        'work_location',
        'deadline',
        'assumption_of_duties'
    ];

    protected $casts = [
        'deadline' => 'datetime',
        'assumption_of_duties' => 'date'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function applications()
    {
        return $this->hasMany(AppliedInternship::class, 'internship_id');
    }
}