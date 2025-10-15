<?php
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CategoriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::apiResource('posts', PostController::class)->only(['index', 'show']);
Route::post('posts', [PostController::class, 'store'])->middleware('auth:sanctum');
Route::patch('posts/{id}', [PostController::class, 'update'])->middleware('auth:sanctum');
Route::delete('posts/{id}', [PostController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('comments/{id}', [CommentController::class, 'index']);
Route::post('comments', [CommentController::class, 'store'])->middleware('auth:sanctum');
Route::apiResource('categories', CategoriesController::class)->only(['index']);
Route::post('categories', [CommentController::class, 'store'])->middleware('auth:sanctum');
Route::apiResource('users', UserController::class);
Route::controller(LoginController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});
Route::middleware('auth:sanctum')->post('/logout', function(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response("Logged out", 200);
    });