<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Http\Resources\StudentResource;
use App\Http\Resources\TeacherResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function students(Request $request) {
        $search = $request->input('search');
        $query = User::where('role_id',2);
        $user = Auth::user();

        if($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $students = $query->latest()->paginate(10);

        return inertia('Dashboard/Students', [
            'user' => new ProfileResource($user),
            'students' => StudentResource::collection($students),
        ]);
    }

    public function teachers(Request $request) {
        $search = $request->input('search');
        $query = User::where('role_id',1);
        $user = Auth::user();

        if($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $teachers = $query->latest()->paginate(10);

        return inertia('Dashboard/Teachers', [
            'user' => new ProfileResource($user),
            'teachers' => TeacherResource::collection($teachers),
        ]);
    }
}
