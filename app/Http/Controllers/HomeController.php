<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Http\Resources\StudentAbsenceLatestResource;
use App\Http\Resources\StudentAbsenceResource;
use App\Http\Resources\TeacherAbsenceResource;
use App\Models\AbsenceStatus;
use App\Models\Classroom;
use App\Models\LearningActivityStatus;
use App\Models\Lesson;
use App\Models\StudentAbsence;
use App\Models\TeacherAbsence;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function teacher()
    {
        $user = Auth::user();
        $classrooms = Classroom::latest()->get();
        $lessons = Lesson::latest()->get();
        $absenceStatuses = AbsenceStatus::latest()->get();
        $teachers = User::where('role_id', 1)->latest()->get();
        $learningActivityStatuses = LearningActivityStatus::latest()->get();

        return inertia('AbsenceTeacher', [
            'user' => new ProfileResource($user),
            'teachers' => $teachers,
            'absenceStatuses' => $absenceStatuses,
            'classrooms' => $classrooms,
            'lessons' => $lessons,
            'learningActivityStatuses' => $learningActivityStatuses
        ]);
    }

    public function student(Request $request)
    {
        $user = Auth::user();
        $classrooms = Classroom::latest()->get();
        $lessons = Lesson::latest()->get();
        $absenceStatuses = AbsenceStatus::latest()->get();
        $teachers = User::where('role_id', 1)->latest()->get();

        $query = User::query();

        if ($request->query('classroom')) {
            $classroom = Classroom::where('slug', $request->query('classroom'))->first();
            if ($classroom) {
                $query->where('classroom_id', $classroom->id);
            }
        }

        $students = $query->where('role_id',2)->latest()->get();

        return inertia('AbsenceStudent', [
            'user' => new ProfileResource($user),
            'teachers' => $teachers,
            'students' => $students,
            'absenceStatuses' => $absenceStatuses,
            'classrooms' => $classrooms,
            'lessons' => $lessons
        ]);
    }

    public function getStudentsByClassroom($slug)
    {
        // Menggunakan slug untuk mencari classroom
        $classroomId = Classroom::where('slug', $slug)->firstOrFail()->id;

        // Mengambil daftar student berdasarkan classroom yang ditemukan
        $students = User::where('role_id', 2)->where('classroom_id', $classroomId)->latest()->get();

        return response()->json($students);
    }
}
