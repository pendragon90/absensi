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
        Schema::create('teacher_absences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('classroom_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('lesson_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('absence_status_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('learning_activity_status_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('photo_start')->nullable();
            $table->string('photo_end')->nullable();
            $table->string('photo_assignment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_absences');
    }
};
