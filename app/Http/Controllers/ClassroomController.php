<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClassroomResource;
use App\Http\Resources\ProfileResource;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClassroomController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $search = $request->input('search');
        $query = Classroom::query();

        if ($search !== '' || $search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $classrooms = $query->latest()->paginate(10);

        return inertia('Dashboard/Classrooms', [
            'classrooms' => ClassroomResource::collection($classrooms),
            'user' => new ProfileResource($user),
        ]);
    }

    public function store(Request $request)
    {
        Classroom::create([
            'name' => $request->name,
            'slug' => $request->name . '-' . uniqid(),
        ]);

        return redirect()->back();
    }
    public function update(Request $request, Classroom $classroom)
    {
        $classroom->update([
            'name' => $request->name,
            'slug' => $request->name . '-' . uniqid(),
        ]);

        return redirect()->back();
    }
    public function destroy(Classroom $classroom)
    {
        $classroom->delete();

        return redirect()->back();
    }
}
