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
        $birthdate = $request->date('birthdate');
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

        User::create([
            'role_id' => $role,
            'name' => $name,
            'slug' => $username . '-' . uniqid(), // Provide a value for the slug field
            'username' => $username,
            'birthdate' => $request->birthdate,
            'classroom_id' => $classroomId,
            'password' => Hash::make($request->password)
        ]);

        // Auth::login($user);

        if ($role == 2) {
            return redirect()->intended('/');
        }

        return redirect()->intended('/dashboard/students/absence');
    }


    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'Username tidak ditemukan']);
        }

        if (Auth::attempt($credentials)) {
            // Auth::login($user);
            $request->session()->regenerate();
            if ($user->role_id === 1 || $user->role_id === 3) {
                return redirect()->intended('/dashboard/students/absence');
            } elseif ($user->role_id === 2) {
                return redirect()->intended('/');
            }
        }

        return back()->withErrors(['error' => 'Password salah']);
    }



    public function logout(Request $request)
    {
        Auth::logout();
 
        $request->session()->invalidate();
     
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
