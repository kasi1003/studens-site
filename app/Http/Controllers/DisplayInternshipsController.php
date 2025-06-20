<?php

namespace App\Http\Controllers;


use App\Models\Internship;
use Illuminate\Support\Facades\Auth;
use App\Models\AppliedInternship;
use Inertia\Inertia;



class DisplayInternshipsController
{
    public function index()
    {
        $student = Auth::user();

        // Get internship IDs where this student has already submitted an application
        $appliedIds = AppliedInternship::where('student_id', $student->id)
            ->where('application_status', 'submitted')
            ->pluck('internship_id')
            ->toArray();

        // Fetch internships for the student's course, excluding already applied ones
        $internships = Internship::where('course', $student->course)
            ->whereNotIn('id', $appliedIds)
            ->get();

        return Inertia::render('Dashboard', [
            'internships' => $internships,
        ]);
    }
}
