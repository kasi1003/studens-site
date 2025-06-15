<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppliedInternship extends Model
{
    use HasFactory;

    protected $table = 'applied_internships';

    protected $fillable = [
        'internship_id',
        'student_id',
        'application_status'
    ];

    protected $casts = [
        'application_status' => 'string'
    ];

    // Relationships
    public function internship()
    {
        return $this->belongsTo(Internship::class, 'internship_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}