<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAbsence extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'teacher_id',
        'classroom_id',
        'lesson_id',
        'absence_status_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
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
}
