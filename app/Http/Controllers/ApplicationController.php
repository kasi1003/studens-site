<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Internship;

class ApplicationController extends Controller
{
    // Show the application form for a given internship
    public function create($id)
    {
        $internship = Internship::findOrFail($id);
        return view('applications.create', compact('internship'));
    }

    // Handle form submission to store application
    public function store(Request $request, $id)
    {
        $request->validate([
            'cover_letter' => 'nullable|string',
        ]);

        Application::create([
            'student_id' => 1, // Replace with authenticated user id later
            'internship_id' => $id,
            'status' => 'pending',
            'cover_letter' => $request->cover_letter,
        ]);

        return redirect()->route('student.dashboard')->with('success', 'Application submitted successfully!');
    }
}
