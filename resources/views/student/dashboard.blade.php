<!DOCTYPE html>
<html>
<head>
    <title>Student Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #f5f5f5;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            font-size: 24px;
            text-align: center;
        }
        .container {
            display: flex;
            max-width: 1200px;
            margin: 20px auto;
            gap: 20px;
            padding: 0 20px;
        }
        .left, .right {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 8px rgba(0,0,0,0.1);
        }
        .left {
            flex: 2; /* wider */
        }
        .right {
            flex: 1; /* narrower */
        }
        .company {
            margin-bottom: 30px;
        }
        .company-name {
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 10px;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 5px;
        }
        .internship {
            margin-left: 15px;
            margin-bottom: 15px;
            padding: 10px;
            border-left: 3px solid #4CAF50;
            background-color: #f9fff9;
            border-radius: 4px;
        }
        .application {
            margin-bottom: 15px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 6px;
            background: #fff;
        }
        .application-status {
            font-weight: bold;
            color: #333;
        }
        a.apply-btn {
            display: inline-block;
            margin-top: 8px;
            padding: 6px 12px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
        }
        a.apply-btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

<div class="header">
    Welcome, {{ $student->name }}

    <form method="POST" action="{{ route('student.logout') }}" style="display: inline-block; margin-left: 20px;">
        @csrf
        <button type="submit" style="
            background-color: #f44336;
            border: none;
            color: white;
            padding: 8px 16px;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            border-radius: 4px;
        ">
            Logout
        </button>
    </form>
</div>

<div class="container">

    <div class="left">
        <h2>Companies & Internships</h2>
        @php
            // Group internships by company
            $groupedInternships = $internships->groupBy(function($internship) {
                return $internship->company ? $internship->company->name : 'Unknown Company';
            });
        @endphp

        @foreach($groupedInternships as $companyName => $companyInternships)
            <div class="company">
                <div class="company-name">{{ $companyName }}</div>
                @foreach($companyInternships as $internship)
                    <div class="internship">
                        <div><strong>{{ $internship->title }}</strong></div>
                        <div>{{ $internship->description }}</div>
                        <a href="{{ route('internships.apply', $internship->id) }}" class="apply-btn">Apply</a>
                    </div>
                @endforeach
            </div>
        @endforeach
    </div>

    <div class="right">
        <h2>Your Applications</h2>
        @if($applications->isEmpty())
            <p>No applications yet.</p>
        @else
            @foreach($applications as $app)
                <div class="application">
                    <div><strong>{{ $app->internship->title ?? 'Unknown Internship' }}</strong></div>
                    <div class="application-status">Status: {{ ucfirst($app->status) }}</div>
                </div>
            @endforeach
        @endif
    </div>

</div>

</body>
</html>
