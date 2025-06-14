<?php

namespace App\Http\Controllers;

use App\Models\Internship;

class InternshipController extends Controller
{
    public function index()
    {
        $internships = Internship::all();
        return view('internships.index', compact('internships'));
    }
}
