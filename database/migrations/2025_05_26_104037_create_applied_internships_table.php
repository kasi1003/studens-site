<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
        public function up(): void
    {
        Schema::create('applied_internships', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('internship_id');
            $table->unsignedBigInteger('student_id');

            $table->enum('application_status', ['accepted', 'rejected', 'submitted'])
                  ->nullable()
                  ->default(null);

            $table->timestamps();

            $table->foreign('internship_id')->references('id')->on('internships')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
        });

        // Add longblob columns manually after table is created
        DB::statement("ALTER TABLE applied_internships ADD cv LONGBLOB NULL");
        DB::statement("ALTER TABLE applied_internships ADD cover_letter LONGBLOB NULL");
        DB::statement("ALTER TABLE applied_internships ADD academic_results LONGBLOB NULL");
        DB::statement("ALTER TABLE applied_internships ADD wil_letter LONGBLOB NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_internships');
    }
};
