<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Http\Resources\StudentAbsenceResource;
use App\Models\AbsenceStatus;
use App\Models\Classroom;
use App\Models\Lesson;
use App\Models\StudentAbsence;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentAbsenceController extends Controller
{
    public function index(Request $request)
    {
        $query = StudentAbsence::query();
        $user = Auth::user();
        if ($request->query('date')) {
            $date = Carbon::parse($request->query('date'))->setTimezone('Asia/Jakarta');
            $query->whereDate('created_at', $date);
        }

        if ($request->query('classroom')) {
            $classroom = Classroom::where('slug', $request->query('classroom'))->first();
            if ($classroom) {
                $query->where('classroom_id', $classroom->id);
            }
        }

        if ($request->query('teacher')) {
            $teacher = User::where('role_id', 1)->where('slug', $request->query('teacher'))->first();
            if ($teacher) {
                $query->where('user_id', $teacher->id);
            }
        }

        if ($request->query('absenceStatus')) {
            $absenceStatus = AbsenceStatus::where('slug', $request->query('absenceStatus'))->first();
            if ($absenceStatus) {
                $query->where('absence_status_id', $absenceStatus->id);
            }
        }

        if ($request->query('lesson')) {
            $lesson = Lesson::where('slug', $request->query('lesson'))->first();
            if ($lesson) {
                $query->where('lesson_id', $lesson->id);
            }
        }

        $studentAbsences = $query->latest()->with(['user','classroom', 'lesson', 'teacher','student', 'absenceStatus'])->paginate($request->query('perpage') ?? 20);

        $classrooms = Classroom::latest()->get();
        $lessons = Lesson::latest()->get();
        $absenceStatuses = AbsenceStatus::latest()->get();
        $teachers = User::where('role_id', 1)->latest()->get();
        $students = User::where('role_id', 2)->latest()->get();

        return inertia('Dashboard/Students/DashboardStudents', [
            'user' => new ProfileResource($user),
            'studentAbsences' => StudentAbsenceResource::collection($studentAbsences),
            'students' => $students,
            'teachers' => $teachers,
            'absenceStatuses' => $absenceStatuses,
            'classrooms' => $classrooms,
            'lessons' => $lessons,
        ]);
    }
    
    public function store(Request $request)
    {
        $student = User::where('role_id', 2)->where('slug', $request->student)->first();
        $teacher = User::where('role_id', 1)->where('slug', $request->teacher)->first();
        $classroom = Classroom::where('slug', $request->classroom)->first();
        $lesson = Lesson::where('slug', $request->lesson)->first();
        $absenceStatus = AbsenceStatus::where('slug', $request->absence_status)->first();

        StudentAbsence::create([
            'student_id' => $student->id,
            'teacher_id' => $teacher->id,
            'classroom_id' => $classroom->id,
            'lesson_id' => $lesson->id,
            'absence_status_id' => $absenceStatus->id,
        ]);

        return redirect('/dashboard/students/absence');
    }
}
