<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppliedInternships extends Model
{
    //
    protected $table = 'applied_internships';

    protected $fillable = [
        'internship_id',
        'student_id',
        'application_status',
        'cv',
        'cover_letter',
        'academic_results',
        'wil_letter',

    ];

    /**
     * Get the internship associated with this application.
     */
    public function internship()
    {
        return $this->belongsTo(Internships::class, 'internship_id');
    }

    /**
     * Get the student who applied for the internship.
     */
    public function student()
    {
        return $this->belongsTo(Students::class, 'student_id');
    }
}
