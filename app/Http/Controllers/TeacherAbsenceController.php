<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Http\Resources\TeacherAbsenceResource;
use App\Models\AbsenceStatus;
use App\Models\Classroom;
use App\Models\LearningActivityStatus;
use App\Models\Lesson;
use App\Models\TeacherAbsence;
use App\Models\User;
use Carbon\Carbon;
use Dotenv\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeacherAbsenceController extends Controller
{
    private function uploadImage($image, $folderPath)
    {
        if ($image) {
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs($folderPath, $imageName, 'public');
            return $folderPath . '/' . $imageName;
        }
        return null;
    }
    
    public function store(Request $request)
    {
        $user_id = User::where('role_id', 1)->where('slug', $request->teacher)->first()->id;
        $classroom_id = Classroom::where('slug', $request->classroom)->first()->id;
        $lesson_id = Lesson::where('slug', $request->lesson)->first()->id;
        $learning_activity_status_id = LearningActivityStatus::where('slug', $request->learning_activity_status)->first()->id;
        $absence_status_id = AbsenceStatus::where('slug', $request->absence_status)->first()->id;

        $monthYear = date('Y_m');
        $folderPath = 'images/' . $monthYear;

        $photoStartPath = $this->uploadImage($request->file('photo_start'), $folderPath);
        $photoEndPath = $this->uploadImage($request->file('photo_end'), $folderPath);
        $photoAssignmentPath = $this->uploadImage($request->file('photo_assignment'), $folderPath);

        TeacherAbsence::create([
            'user_id' => $user_id,
            'classroom_id' => $classroom_id,
            'lesson_id' => $lesson_id,
            'learning_activity_status_id' => $learning_activity_status_id,
            'absence_status_id' => $absence_status_id,
            'photo_start' => $photoStartPath,
            'photo_end' => $photoEndPath,
            'photo_assignment' => $photoAssignmentPath,
        ]);

        return redirect('/dashboard/teachers/absence/');
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        $query = TeacherAbsence::query();

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

        if ($request->query('learningActivityStatus')) {
            $learningActivityStatus = LearningActivityStatus::where('slug', $request->query('learningActivityStatus'))->first();
            if ($learningActivityStatus) {
                $query->where('learning_activity_status_id', $learningActivityStatus->id);
            }
        }

        if ($request->query('lesson')) {
            $lesson = Lesson::where('slug', $request->query('lesson'))->first();
            if ($lesson) {
                $query->where('lesson_id', $lesson->id);
            }
        }

        $teacherAbsences = $query->latest()->with(['classroom', 'lesson', 'user', 'learningActivityStatus', 'absenceStatus'])->paginate($request->query('perpage') ?? 20);

        $classrooms = Classroom::latest()->get();
        $lessons = Lesson::latest()->get();
        $absenceStatuses = AbsenceStatus::latest()->get();
        $teachers = User::where('role_id', 1)->latest()->get();
        $learningActivityStatuses = LearningActivityStatus::latest()->get();

        return inertia('Dashboard/Teachers/DashboardTeachers', [
            'user' => new ProfileResource($user),
            'teacherAbsences' => TeacherAbsenceResource::collection($teacherAbsences),
            'teachers' => $teachers,
            'absenceStatuses' => $absenceStatuses,
            'classrooms' => $classrooms,
            'lessons' => $lessons,
            'learningActivityStatuses' => $learningActivityStatuses,
        ]);
    }
}
