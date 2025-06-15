<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Students;
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
        return Inertia::render('Auth/Register', [
        'faculties' => [
            'Computing and Informatics' => [
                'CERTIFICATE IN ADVANCED WEB TECHNOLOGIES',
                'CERTIFICATE IN BIG DATA TECHNOLOGIES',
                'CERTIFICATE IN ETHICAL HACKING AND INFORMATION SECURITY',
                'BACHELOR OF COMPUTER SCIENCE (Systems Administration, Communication Networks, Software Development)',
                'BACHELOR OF INFORMATICS',
                'BACHELOR OF JOURNALISM AND MEDIA TECHNOLOGY',
                'BACHELOR OF COMPUTER SCIENCE (CYBER SECURITY)',
            ],
            'Engineering and the Built Environment' => [
                'INTRODUCTION TO SCIENCE, TECHNOLOGY, ENGINEERING AND MATHEMATICS (InSTEM)',
                'BACHELOR OF TECHNOLOGY: ENGINEERING: CIVIL: URBAN OR WATER',
                'NATIONAL DIPLOMA IN ENGINEERING (CIVIL AND PROJECT MANAGEMENT)',
                'BACHELOR OF TECHNOLOGY IN CIVIL ENGINEERING',
                'BACHELOR OF ENGINEERING IN CIVIL ENGINEERING',
                'BACHELOR OF ENGINEERING IN MINING',
                'BACHELOR OF ENGINEERING IN METALLURGY',
                'BACHELOR OF ENGINEERING IN CHEMICAL ENGINEERING',
                'BACHELOR OF TECHNOLOGY IN ELECTRONIC ENGINEERING',
                'BACHELOR OF TECHNOLOGY IN POWER ENGINEERING',
                'BACHELOR OF ENGINEERING IN ELECTRONICS AND TELECOMMUNICATION ENGINEERING',
                'BACHELOR OF ENGINEERING IN ELECTRICAL POWER ENGINEERING',
                'BACHELOR OF TECHNOLOGY IN MECHANICAL ENGINEERING',
                'BACHELOR OF ENGINEERING IN MECHANICAL ENGINEERING',
                'BACHELOR OF ENGINEERING IN INDUSTRIAL ENGINEERING',
                'BACHELOR OF TECHNOLOGY IN MARINE ENGINEERING',
                'BACHELOR OF PROPERTY STUDIES',
                'BACHELOR OF LAND ADMINISTRATION',
                'DIPLOMA IN GEOMATICS',
                'BACHELOR OF GEOMATICS',
                'BACHELOR OF GEOINFORMATION TECHNOLOGY',
                'BACHELOR OF ARCHITECTURE',
                'BACHELOR OF TOWN AND REGIONAL PLANNING',
                'BACHELOR OF REGIONAL AND RURAL DEVELOPMENT',
                'BACHELOR OF QUANTITY SURVEYING',
                'DIPLOMA IN LAND ADMINISTRATION',
                'DIPLOMA IN PROPERTY STUDIES',
                'BACHELOR OF ENGINEERING: ELECTRONICS AND TELECOMMUNICATIONS',
                'BACHELOR OF ENGINEERING: ELECTRICAL POWER',
            ],
            'Health, Natural Resources and Applied Sciences' => [
                'BACHELOR OF MEDICAL LABORATORY SCIENCES',
                'BACHELOR OF EMERGENCY MEDICAL CARE',
                'BACHELOR OF ENVIRONMENTAL HEALTH SCIENCES',
                'BACHELOR OF SCIENCE IN HEALTH INFORMATION SYSTEMS MANAGEMENT',
                'BACHELOR OF HUMAN NUTRITION',
                'BACHELOR OF SCIENCE',
                'BACHELOR OF SCIENCE IN AGRICULTURE',
                'BACHELOR OF HORTICULTURE',
                'BACHELOR OF NATURAL RESOURCE MANAGEMENT',
                'BACHELOR OF NATURAL RESOURCE MANAGEMENT IN NATURE CONSERVATION (Phasing out until 2024)',
                'BACHELOR OF SCIENCE IN APPLIED MATHEMATICS AND STATISTICS',
            ],
            'Commerce, Human Sciences and Education' => [
                'BACHELOR OF COMMUNICATION',
                'BACHELOR OF ENGLISH',
                'DIPLOMA IN TECHNICAL AND VOCATIONAL EDUCATION AND TRAINING: TRAINER',
                'DIPLOMA IN TECHNICAL AND VOCATIONAL EDUCATION AND TRAINING: MANAGEMENT',
                'DIPLOMA IN VOCATIONAL EDUCATION AND TRAINING MANAGMENT',
                'Certificate in Vocational Education and Training: Trainer (Phasing out from 2020 until 2022)',
                'BACHELOR OF CRIMINAL JUSTICE IN CORRECTIONAL MANAGEMENT',
                'BACHELOR OF CRIMINAL JUSTICE IN POLICING',
                'BACHELOR OF PUBLIC MANAGEMENT',
                'BACHELOR OF ACCOUNTING',
                'BACHELOR OF ACCOUNTING (CHARTERED ACCOUNTANCY)',
                'DIPLOMA IN THE THEORY OF ACCOUNTING (DTA)',
                'BACHELOR OF ECONOMICS',
                'BACHELOR OF HOSPITALITY MANAGEMENT',
                'CERTIFICATE IN HOSPITALITY OPERATIONS',
                'BACHELOR OF TOURISM INNOVATION AND DEVELOPMENT',
                'BACHELOR OF TOURISM MANAGEMENT',
                'BACHELOR OF CULINARY ARTS',
                'BACHELOR OF HOSPITALITY AND TOURISM HONOURS',
                'CERTIFICATE IN SUPERVISORY SKILLS DEVELOPMENT',
                'DIPLOMA IN BUSINESS PROCESS MANAGEMENT',
                'BACHELOR OF BUSINESS MANAGEMENT',
                'BACHELOR OF ENTREPRENEURSHIP',
                'BACHELOR OF HUMAN RESOURCES MANAGEMENT',
                'BACHELOR OF BUSINESS AND INFORMATION ADMINISTRATION',
                'BACHELOR OF MARKETING',
                'BACHELOR OF TRANSPORT MANAGEMENT',
                'CERTIFICATE IN TRANSPORT MANAGEMENT',
                'DIPLOMA IN TRANSPORT MANAGEMENT',
                'BACHELOR OF SPORT MANAGEMENT',
                'BACHELOR OF LOGISTICS AND SUPPLY CHAIN MANAGEMENT',
                'BACHELOR OF ENGLISH AND LINGUISTICS',
                'DIPLOMA IN ACCOUNTING AND FINANCE',
                'BACHELOR OF TOURISM, INNOVATION AND DEVELOPMENT',
                'BRIDGING PROGRAMME - SOCIAL SCIENCES',
                'CERTIFICATE IN PROCUREMENT MANAGEMENT',
            ],
        ]
    ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
         public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'student_num' => 'required|digits:9|unique:students',
            'faculty' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'unique:' . Students::class,
                'regex:/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|nust\.na)$/',
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'email.regex' => 'Email is not allowed.',
        ]);

        // Find or create the course
        $course = \App\Models\Course::firstOrCreate([
            'faculty' => $request->faculty,
            'name' => $request->course,
        ]);

        // Create the student with a foreign key to course
        $user = Students::create([
            'student_num' => $request->student_num,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'course_id' => $course->id,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
