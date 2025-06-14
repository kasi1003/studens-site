<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class StudentAuthController extends Controller
{
    public function showLogin()
    {
        return view('auth.login');
    }

    public function showRegister()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'id' => 'required|numeric|unique:students,id',
            'name' => 'required|string',
            'email' => 'required|email|unique:students,email',
            'password' => 'required|min:6|confirmed',
        ]);

        Student::create([
            'id' => $request->id,
            'name' => $request->name,
            'email' => $request->email,
            'university' => 'NUST',
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('student.login')->with('success', 'Registration successful. You can now log in.');
    }

    public function login(Request $request)
    {
        $request->validate([
            'id' => 'required|numeric',
            'password' => 'required',
        ]);

        $student = Student::find($request->id);

        if ($student && Hash::check($request->password, $student->password)) {
            Auth::login($student);
            return redirect()->route('student.dashboard');
        }

        return back()->withErrors(['id' => 'Invalid credentials']);
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('student.login');
    }
}
