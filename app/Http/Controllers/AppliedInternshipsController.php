<?php

namespace App\Http\Controllers;

use App\Models\AppliedInternships;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AppliedInternshipsController extends Controller
{
    //
        public function store(Request $request)
    {
        $request->validate([
            'internship_id' => 'required|exists:internships,id',
            'cv' => 'file|mimes:pdf,doc,docx',
            'cover_letter' => 'file|mimes:pdf,doc,docx',
            'academic_results' => 'file|mimes:pdf,doc,docx',
            'wil_letter' => 'file|mimes:pdf,doc,docx',
        ]);

        AppliedInternships::create([
            'internship_id' => $request->internship_id,
            'student_id' => Auth::id(),
            'application_status' => 'submitted',
            'cv' => file_get_contents($request->file('cv')),
            'cover_letter' => file_get_contents($request->file('cover_letter')),
            'academic_results' => file_get_contents($request->file('academic_results')),
            'wil_letter' => file_get_contents($request->file('wil_letter')),
        ]);

        return back()->with('success', 'Applied successfully!');
    }
}
