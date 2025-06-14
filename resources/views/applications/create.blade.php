<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Apply for Internship</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body>
<div class="container mt-5">
    <h1>Apply for: {{ $internship->title }}</h1>

    <form action="{{ route('applications.store', $internship->id) }}" method="POST">
        @csrf

        <div class="mb-3">
            <label for="cover_letter" class="form-label">Cover Letter (optional)</label>
            <textarea class="form-control" id="cover_letter" name="cover_letter" rows="5"></textarea>
        </div>

        <button type="submit" class="btn btn-success">Submit Application</button>
        <a href="{{ route('student.dashboard') }}" class="btn btn-secondary ms-2">Back to dashboard</a>
    </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
