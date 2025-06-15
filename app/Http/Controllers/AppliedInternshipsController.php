<?php

namespace App\Http\Controllers;

use App\Models\AppliedInternship;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AppliedInternshipsController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'internship_id' => 'required|exists:internships,id',
        ]);

        AppliedInternship::create([
            'internship_id' => $request->internship_id,
            'student_id' => Auth::id(),
            'application_status' => 'submitted',
        ]);

        return back()->with('success', 'Applied successfully!');
    }
}
