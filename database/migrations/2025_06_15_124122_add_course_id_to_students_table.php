<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn(['faculty', 'course']); // remove old columns
            $table->foreignId('course_id')
                  ->nullable()
                  ->constrained('courses')
                  ->onDelete('set null'); // add foreign key
        });
    }

    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->string('faculty')->nullable();
            $table->string('course')->nullable();
            $table->dropForeign(['course_id']);
            $table->dropColumn('course_id');
        });
    }
};
