<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\AppliedInternship;
use Inertia\Inertia;

use Illuminate\Http\Request;

class SubmittedInternshipsController extends Controller
{
    //
    public function index()
    {
        $student = Auth::user();

        $applied = AppliedInternship::with('internship')
            ->where('student_id', $student->id)
            ->get();

        return Inertia::render('SubmittedInternships', [
            'appliedInternships' => $applied,
        ]);
    }
}
