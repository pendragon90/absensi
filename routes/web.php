<?php

use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\DashboardAbsenceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentAbsenceController;
use App\Http\Controllers\TeacherAbsenceController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\OnlyAdmin;
use App\Http\Middleware\OnlyStudent;
use App\Http\Middleware\OnlyTeacher;
use Illuminate\Support\Facades\Route;


Route::get('/reset', [AuthController::class, 'reset']);
Route::patch('/reset', [AuthController::class, 'resetPassword']);

Route::middleware(['auth'])->group(function () {
    Route::get('/', [HomeController::class, 'student']);
    Route::get('/absence/teacher', [HomeController::class, 'teacher']);

    Route::get('/profile', [ProfileController::class, 'index']);
    Route::patch('/profile/{user}', [ProfileController::class, 'update']);

    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::get('/register', [AuthController::class, 'registerPage'])
    ->name('register');
Route::post('/register', [AuthController::class, 'register']);

Route::get('/login', [AuthController::class, 'loginPage'])
    ->name('login');
Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['auth'])->prefix('/dashboard')->group(function () {
    Route::get('/classrooms', [ClassroomController::class, 'index']);

    Route::get('/lessons', [LessonController::class, 'index']);

    Route::get('/teachers', [UserController::class, 'teachers']);

    Route::get('/students', [UserController::class, 'students']);


    Route::middleware(['onlyStudent'])->group(function () {
        Route::get('/teachers/absence', [TeacherAbsenceController::class, 'index']);
        Route::post('/teachers/absence', [TeacherAbsenceController::class, 'store']);
        Route::post('/students/absence', [StudentAbsenceController::class, 'store']);
    });

    Route::middleware(['onlyTeacher'])->group(function () {
        Route::get('/students/absence', [StudentAbsenceController::class, 'index']);

        Route::post('/classrooms', [ClassroomController::class, 'store']);
        Route::patch('/classrooms/{classroom}', [ClassroomController::class, 'update']);
        Route::delete('/classrooms/{classroom}', [ClassroomController::class, 'destroy']);

        Route::post('/lessons', [LessonController::class, 'store']);
        Route::patch('/lessons/{lesson}', [LessonController::class, 'update']);
        Route::delete('/lessons/{lesson}', [LessonController::class, 'destroy']);
    });
});
