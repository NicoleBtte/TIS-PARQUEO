<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\EntradasSalidasController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/


Route::get('/', function () {
    return view('login');
})->name('login');

/*Route::get('/signin', function () {
    return view('signin');
});*/

//Route::post('/', [ClienteController::class, 'store']);

Route::get('/logrado', function() {
    return view('logrado');
})->name('logrado');

Route::get('/login', function () {
    return view('logincliente');
});

Route::get('/cliente', [ClienteController::class, 'index']);

Route::post('/login', [ClienteController::class, 'login']);

Route::get('/ejemplo', function(){
    return view('welcome');
})->name('ejemplo');

Route::get('/fallido', function(){
    return view('fallido');
})->name('fallido');

Route::get('/privado', function(){
    return view('privado');
})->middleware('auth')->name('privado');


