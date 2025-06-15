<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Validation\Rules\Password;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'student_num' => [
                'required',
                'integer',
                'unique:students',
                'regex:/^\d{7,10}$/' // Student number regex
            ],
            'name' => [
                'required',
                'string',
                'max:255',
                'regex:/^(?:[A-Za-z\'-]{2,})(?:\s+[A-Za-z\'-]{2,}){0,6}$/'
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:students',
                'regex:/@(gmail\.com|nust\.na|outlook\.com)$/'
            ],
            'faculty' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
        ], [
            'student_num.regex' => 'Student number must be 7-10 digits',
            'name.regex' => 'Name must be 2-4 words with 2+ characters each',
            'email.regex' => 'Email must be from @gmail.com, @nust.na or @outlook.com',
            'password.min' => 'Password must contain uppercase, lowercase, number and special character',
        ]);


        $user = Student::create([
            'student_num' => $request->student_num,
            'faculty' => $request->faculty,          // Add this
            'course' => $request->course,            // Add this
            'specialization' => $request->specialization,

            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
