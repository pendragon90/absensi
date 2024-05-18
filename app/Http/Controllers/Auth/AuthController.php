<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Classroom;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Display the login view.
     */
    public function loginPage(Request $request)
    {
        $classrooms = Classroom::latest()->get();

        $teachers = User::where('role_id', 1)
            ->latest()
            ->get();
        return inertia('Auth/Login', compact('classrooms', 'teachers'));
    }

    public function registerPage(Request $request)
    {
        $classrooms = Classroom::latest()->get();

        $teachers = User::where('role_id', 1)
            ->latest()
            ->get();
        return inertia('Auth/Register', compact('classrooms', 'teachers'));
    }


    public function reset()
    {
        return inertia('Auth/Reset');
    }

    public function resetPassword(Request $request)
    {
        $user = User::where('username', $request->username)->first();
        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'Username tidak ditemukan']);
        }
        $birthdate = Carbon::parse($request->input('birthday'))->format('Y-m-d');
        $newPassword = $request->input('password');

        if ($user->birthdate == $birthdate) {
            $user->password = Hash::make($newPassword);
            $user->save();
            return redirect('/login');
        } else {
            return redirect()->back()->withErrors(['error' => 'Tanggal lahir tidak cocok']);
        }
    }

    public function register(Request $request)
    {
        $name = $request->name;
        $username = $request->username;
        $classroomId = null; 

        $user = User::where('username', $request->username)->first();
        if ($user) {
            return redirect()->back()->withErrors(['error' => 'Username sudah ada']);
        }

        // Check if classroom slug is provided and find corresponding ID
        if ($request->classroom) {
            $classroom = Classroom::where('slug', $request->classroom)->first();
            $classroomId = $classroom->id;
        }

        $role = $request->role;

        $user = User::create([
            'role_id' => $role,
            'name' => $name,
            'slug' => $username . '-' . uniqid(), // Provide a value for the slug field
            'username' => $username,
            'birthdate' => $request->birthdate,
            'classroom_id' => $classroomId,
            'password' => Hash::make($request->password)
        ]);

        Auth::login($user);

        if ($role == 2) {
            return redirect('/');
        }

        return redirect('/dashboard/students/absence');
    }


    public function login(Request $request)
    {
        $user = User::where('username', $request->username)->first();

        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'Username tidak ditemukan']);
        }

        if ($user && Hash::check($request->password, $user->password)) {
            Auth::login($user);

            // Check the user's role ID
            if ($user->role_id === 1 || $user->role_id === 3) {
                // Redirect to the dashboard if role ID is 1 or 3
                return redirect('/dashboard/students/absence');
            } elseif ($user->role_id === 2) {
                return redirect('/');
            }
        }

        // Redirect back with error message if authentication fails
        return back()->withErrors(['error' => 'Password salah']);
    }



    public function logout()
    {
        Auth::logout();

        return redirect('/login');
    }
}
