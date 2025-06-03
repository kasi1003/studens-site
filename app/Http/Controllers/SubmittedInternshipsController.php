<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\AppliedInternships;
use Inertia\Inertia;

use Illuminate\Http\Request;

class SubmittedInternshipsController extends Controller
{
    //
    public function index()
    {
        $student = Auth::user();

        $applied = AppliedInternships::with('internship')
            ->where('student_id', $student->id)
            ->get();

        return Inertia::render('SubmittedInternships', [
            'appliedInternships' => $applied,
        ]);
    }
}
