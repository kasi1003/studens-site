<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Internships extends Model
{
    //
     protected $table = 'internships';

    protected $fillable = [
        'user_id',
        'related_course',
        'internship_name',
        'internship_description',
        'work_hours',
        'work_location',
    ];

    /**
     * Get the user that owns the internship.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
