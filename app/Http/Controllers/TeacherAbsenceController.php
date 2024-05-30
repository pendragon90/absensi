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
use Intervention\Image\Facades\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TeacherAbsenceController extends Controller
{

    private function uploadImage($image, $folderPath)
    {
        if ($image) {
            // Generate a filename
            $imageName = time() . '_' . $image->getClientOriginalName();
            $fullPath = $folderPath . '/' . $imageName;
    
            // Check if the image size is greater than 500KB (512000 bytes)
            if ($image->getSize() > 512000) {
                // Resize the image
                $img = Image::make($image);
                $img->resize(800, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
    
                // Save the resized image to the specified folder
                // Ensure the directory exists
                Storage::disk('public')->makeDirectory($folderPath);
                $img->save(storage_path('app/public/' . $fullPath));
            } else {
                // Save the original image if it's not greater than 500KB
                // Ensure the directory exists
                Storage::disk('public')->makeDirectory($folderPath);
                $image->storeAs($folderPath, $imageName, 'public');
            }
    
            return $fullPath;
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

        $minDate = TeacherAbsence::min('created_at');
        $maxDate = TeacherAbsence::max('created_at');


        return inertia('Dashboard/Teachers/DashboardTeachers', [
            'minDate' => $minDate,
            'maxDate' => $maxDate,
            'user' => new ProfileResource($user),
            'teacherAbsences' => TeacherAbsenceResource::collection($teacherAbsences),
            'teachers' => $teachers,
            'absenceStatuses' => $absenceStatuses,
            'classrooms' => $classrooms,
            'lessons' => $lessons,
            'learningActivityStatuses' => $learningActivityStatuses,
        ]);
    }

    public function destroy(Request $request)
    {
        // Mengambil input tanggal dari request dan mengonversinya menjadi objek Carbon
        $startDate = Carbon::parse($request->input('deleteByMonth.0'))->startOfMonth();
        $endDate = $request->input('deleteByMonth.1') ? Carbon::parse($request->input('deleteByMonth.1'))->endOfMonth() : null;
        
        // Jika endDate null, atur endDate sama dengan startDate
        if (is_null($endDate)) {
            $endDate = $startDate->copy()->endOfMonth();
        }
    
        $currentDate = $startDate->copy();
        while ($currentDate->lte($endDate)) {
            $folderPath = 'images/' . $currentDate->format('Y_m');
            
            // Hapus direktori
            Storage::disk('public')->deleteDirectory($folderPath);
            
            $currentDate->addMonth();
        }
    
        // Menghapus data dari tabel TeacherAbsence dalam rentang tanggal yang diberikan
        TeacherAbsence::whereBetween('created_at', [$startDate, $endDate])->delete();
    
        // Redirect kembali dengan pesan sukses
        return redirect()->back();
    }
    
}
