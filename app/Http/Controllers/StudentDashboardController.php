<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Internship;
use App\Models\Application;
use Illuminate\Support\Facades\Auth;

class StudentDashboardController extends Controller
{
    public function index()
    {
        $student = Auth::guard('student')->user();  // Get the logged-in student

        $internships = Internship::with('company')->get();
        $applications = Application::with('internship')
            ->where('student_id', $student->id)
            ->get();

        return view('student.dashboard', compact('student', 'internships', 'applications'));
    }
}
