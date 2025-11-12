<?php
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::get('/image/{filename}', function ($filename, Request $request) {
    $path = 'uploads/' . $filename;

    if (!Storage::disk('public')->exists($path)) {
        abort(404);
    }

    $file = Storage::disk('public')->get($path);
    $mime = Storage::disk('public')->mimeType($path);

    return response($file, 200)
        ->header('Content-Type', $mime)
        ->header('Access-Control-Allow-Origin', '*');
});
Route::apiResource('posts', PostController::class)->only(['index', 'show']);
Route::post('posts', [PostController::class, 'store'])->middleware('auth:sanctum');
Route::patch('posts/{id}', [PostController::class, 'update'])->middleware('auth:sanctum');
Route::delete('posts/{id}', [PostController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('comments/{id}', [CommentController::class, 'index']);
Route::post('comments', [CommentController::class, 'store'])->middleware('auth:sanctum');
Route::delete('comments/{id}', [CommentController::class, 'destroy'])->middleware('auth:sanctum');
Route::apiResource('categories', CategoriesController::class)->only(['index', 'show']);
Route::post('categories', [CategoriesController::class, 'store'])->middleware('auth:sanctum');
//Route::apiResource('users', UserController::class);
Route::get('admin/byCategory/{category}', [AdminController::class, 'showByPostCategory']);
Route::get('admin/byTag/{tag}', [AdminController::class, 'showByPostTag']);
Route::get('admin/byAuthor/{author}', [AdminController::class, 'showByPostAuthor']);
Route::get('admin/byPeriod/{period}', [AdminController::class, 'showByPostPublishedAt']);
Route::get('users', [UserController::class, 'index']);
Route::delete('users/{id}', [UserController::class, 'destroy'])->name('users.destroy')->middleware('auth:sanctum');
Route::get('users/{id}', [UserController::class, 'show']);
Route::post('users/{id}', [UserController::class, 'update'])->name('users.update')->middleware('auth:sanctum');
Route::controller(LoginController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});
Route::middleware('auth:sanctum')->post('/logout', function(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response(["message"=>"Logged out"], 200);
    });