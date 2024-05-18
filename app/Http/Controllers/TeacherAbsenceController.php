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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Support\Str;
use Yaza\LaravelGoogleDriveStorage\Gdrive;

class TeacherAbsenceController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request to ensure files are present and other fields are correct
        $validator = FacadesValidator::make($request->all(), [
            'teacher' => 'required|exists:users,slug',
            'classroom' => 'required|exists:classrooms,slug',
            'lesson' => 'required|exists:lessons,slug',
            'learning_activity_status' => 'required|exists:learning_activity_statuses,slug',
            'absence_status' => 'required|exists:absence_statuses,slug',
            'photo_start' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'photo_end' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'photo_assignment' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
        ]);
    
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    
        $user_id = User::where('role_id', 1)->where('slug', $request->teacher)->first()->id;
        $classroom_id = Classroom::where('slug', $request->classroom)->first()->id;
        $lesson_id = Lesson::where('slug', $request->lesson)->first()->id;
        $learning_activity_status_id = LearningActivityStatus::where('slug', $request->learning_activity_status)->first()->id;
        $absence_status_id = AbsenceStatus::where('slug', $request->absence_status)->first()->id;
    
        // Initialize photo paths as null
        $photo_start_name = null;
        $photo_end_name = null;
        $photo_assignment_name = null;
    
        // Get the current timestamp
        $timestamp = Carbon::now()->format('YmdHis');
    
        // Function to sanitize file names
        function sanitizeFileName($fileName) {
            return preg_replace('/[^\w\-_\.]/', '_', $fileName);
        }
    
        // Check if photo_start is uploaded
        if ($request->hasFile('photo_start')) {
            $photo_start_extension = $request->file('photo_start')->getClientOriginalExtension();
            $photo_start_name = sanitizeFileName('photo_start-' . $request->teacher . '-' . $timestamp . '.' . $photo_start_extension);
            Gdrive::put('gambar_absensi_guru/' . $photo_start_name, file_get_contents($request->file('photo_start')->getRealPath()));
        }
    
        // Check if photo_end is uploaded
        if ($request->hasFile('photo_end')) {
            $photo_end_extension = $request->file('photo_end')->getClientOriginalExtension();
            $photo_end_name = sanitizeFileName('photo_end-' . $request->teacher . '-' . $timestamp . '.' . $photo_end_extension);
            Gdrive::put('gambar_absensi_guru/' . $photo_end_name, file_get_contents($request->file('photo_end')->getRealPath()));
        }
    
        // Check if photo_assignment is uploaded
        if ($request->hasFile('photo_assignment')) {
            $photo_assignment_extension = $request->file('photo_assignment')->getClientOriginalExtension();
            $photo_assignment_name = sanitizeFileName('photo_assignment-' . $request->teacher . '-' . $timestamp . '.' . $photo_assignment_extension);
            Gdrive::put('gambar_absensi_guru/' . $photo_assignment_name, file_get_contents($request->file('photo_assignment')->getRealPath()));
        }
    
        // Create the TeacherAbsence record
        TeacherAbsence::create([
            'user_id' => $user_id,
            'classroom_id' => $classroom_id,
            'lesson_id' => $lesson_id,
            'learning_activity_status_id' => $learning_activity_status_id,
            'absence_status_id' => $absence_status_id,
            'photo_start' => $photo_start_name,
            'photo_end' => $photo_end_name,
            'photo_assignment' => $photo_assignment_name,
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
