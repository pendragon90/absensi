<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherAbsence extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'classroom_id',
        'lesson_id',
        'absence_status_id',
        'learning_activity_status_id',
        'photo_start',
        'photo_end',
        'photo_assignment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function absenceStatus() {
        return $this->belongsTo(AbsenceStatus::class);
    }

    public function learningActivityStatus() {
        return $this->belongsTo(LearningActivityStatus::class);
    }
}
