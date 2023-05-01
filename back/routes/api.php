<?php

use App\Http\Controllers\ConvocatoriaController;
use App\Http\Controllers\ParqueoController;
use App\Http\Controllers\ZonaDeEstacionamientoController;
use App\Http\Controllers\NotificacionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\SitioController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/convocatorias', [ConvocatoriaController::class, 'index']);
Route::post('/convocatoria', [ConvocatoriaController::class, 'store']);
Route::get('/convocatoria/{idConvocatoria}', [ConvocatoriaController::class, 'show']);
Route::put('/convocatoria/{idConvocatoria}', [ConvocatoriaController::class, 'update']);
Route::delete('/convocatoria/{idConvocatoria}', [ConvocatoriaController::class, 'destroy']);

Route::get('/parqueos', [ParqueoController::class ,'index']);
Route::post('/parqueo',  [ParqueoController::class ,'store']);
Route::get('/parqueo/{idParqueo}', [ParqueoController::class ,'show']);
Route::put('/parqueo/{idParqueo}',  [ParqueoController::class ,'update']);
Route::delete('/parqueo/{idParqueo}', [ParqueoController::class ,'destroy']);


/*Route::controller(ZonaDeEstacionamientoController::class)->group(function () {
    Route::get('/zonaDeEstacionamientos', 'index');
    Route::post('/zonaDeEstacionamiento', 'store');
    Route::get('/zonaDeEstacionamiento/{idZonaEstacionamiento}', 'show');
    Route::put('/zonaDeEstacionamiento/{idZonaEstacionamiento}', 'update');
    Route::delete('/zonaDeEstacionamiento/{idZonaEstacionamiento}', 'destroy');
});*/

Route::post('/zona', [ZonaDeEstacionamientoController::class, 'store']);
Route::get('/zona', function(){
    return view('zona');
});
Route::post('/crearSitio',[SitioController::class,'registroSitios']);

Route::post('/notificaciones',[NotificacionController::class, 'store']);
Route::get('/notificaciones',[NotificacionController::class, 'index']);