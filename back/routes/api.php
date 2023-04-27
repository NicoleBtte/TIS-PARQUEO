<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use Illuminate\Support\Facades\Session;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    //Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout', [ClienteController::class, 'logout']);
});


Route::get('/signin', function () {
    return view('signin');
});
Route::post('/register', [ClienteController::class, 'store']);
Route::post('/login', [ClienteController::class, 'login']);


Route::get('/sessions', function () {
    $sessions = collect(Session::all())->map(function ($session) {
        return [
            'id' => $session->getId(),
            'user_id' => $session->get('user_id'),
            'last_activity' => $session->get('last_activity'),
        ];
    });

    return response()->json(compact('sessions'));
})->name('sessions');
