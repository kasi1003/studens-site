<?php

namespace App\Http\Controllers;


use App\Models\Internships;
use Illuminate\Support\Facades\Auth;
use App\Models\AppliedInternships;
use Inertia\Inertia;



class DisplayInternshipsController
{
            public function index()
    {
        $student = Auth::user()->load('course');

        if (!$student->course) {
            // Course not assigned, no internships
            return Inertia::render('Dashboard', [
                'internships' => [],
                'filters' => [
                    'location' => request('location'),
                    'name' => request('name'),
                ],
            ]);
        }

        $facultyName = $student->course->faculty;

        $appliedIds = AppliedInternships::where('student_id', $student->id)
            ->where('application_status', 'submitted')
            ->pluck('internship_id')
            ->toArray();

        $location = request('location');
        $name = request('name');

        $query = Internships::query()
            ->where('related_course', 'like', '%' . $facultyName . '%')
            ->whereNotIn('id', $appliedIds);

        if ($location) {
            $query->where('work_location', 'like', '%' . $location . '%');
        }

        if ($name) {
            $query->where('internship_name', 'like', '%' . $name . '%');
        }

        $internships = $query->with('user')->get()->map(function ($internship) {
        return [
            'id' => $internship->id,
            'internship_name' => $internship->internship_name,
            'internship_description' => $internship->internship_description,
            'work_hours' => $internship->work_hours,
            'work_location' => $internship->work_location,
            'user' => [
                'email' => $internship->user->email,
                'contact_number' => $internship->user->contact_number,
                'company_description' => $internship->user->company_description,
            ],
        ];
    });

    return Inertia::render('Dashboard', [
        'internships' => $internships,
        'filters' => [
            'location' => $location,
            'name' => $name,
        ],
    ]);
}
}
