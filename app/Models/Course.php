<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    protected $fillable = [
        'faculty',
        'name', // this is the course name
    ];

    /**
     * A course can have many students.
     */
    public function students(): HasMany
    {
        return $this->hasMany(Students::class);
    }
}
