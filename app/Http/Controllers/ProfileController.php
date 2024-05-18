<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $classrooms = Classroom::get()->all();
        return inertia('ProfilePage', [
            'user' => new ProfileResource($user),
            'classrooms' => $classrooms
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $classroomId = Classroom::where('slug', $request->classroom)->first()->id;

        $user->update([
            'username' => $request->username,
            'name' => $request->name,
            'classroom_id' => $classroomId,
            'birthdate' => $request->birthdate,
            'slug' => $request->username . '-' . uniqid(),
        ]);

        return redirect()->back();
    }
}
