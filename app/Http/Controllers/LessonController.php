<?php

namespace App\Http\Controllers;

use App\Http\Resources\LessonResource;
use App\Http\Resources\ProfileResource;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LessonController extends Controller
{
    public function index(Request $request) {
        $search = $request->input('search');
        $user = Auth::user();
        $query = lesson::query();

        if($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $lessons = $query->latest()->paginate(10);

        return inertia('Dashboard/Lessons', [
            'user' => new ProfileResource($user),
            'lessons' => LessonResource::collection($lessons),
        ]);
    }

    public function store(Request $request)
    {
        Lesson::create([
            'name' => $request->name,
            'slug' => $request->name . '-' . uniqid(),
        ]);
        return redirect()->back();
    }
    public function update(Request $request, Lesson $lesson)
    {
        $lesson->update([
            'name' => $request->name,
            'slug' => $request->name . '-' . uniqid(),
        ]);
        return redirect()->back();
    }
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return redirect()->back();
    }
}
