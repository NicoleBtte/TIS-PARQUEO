<?php

use App\Http\Controllers\ConvocatoriaController;
use App\Http\Controllers\ParqueoController;
use App\Http\Controllers\ZonaDeEstacionamientoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(ConvocatoriaController::class)->group(function () {
    Route::get('/convocatorias', 'index');
    Route::post('/convocatoria', 'store');
    Route::get('/convocatoria/{idConvocatoria}', 'show');
    Route::put('/convocatoria/{idConvocatoria}', 'update');
    Route::delete('/convocatoria/{idConvocatoria}', 'destroy');
});

Route::controller(ParqueoController::class)->group(function () {
    Route::get('/parqueos', 'index');
    Route::post('/parqueo', 'store');
    Route::get('/parqueo/{idParqueo}', 'show');
    Route::put('/parqueo/{idParqueo}', 'update');
    Route::delete('/parqueo/{idParqueo}', 'destroy');
});

/*Route::controller(ZonaDeEstacionamientoController::class)->group(function () {
    Route::get('/zonaDeEstacionamientos', 'index');
    Route::post('/zonaDeEstacionamiento', 'store');
    Route::get('/zonaDeEstacionamiento/{idZonaEstacionamiento}', 'show');
    Route::put('/zonaDeEstacionamiento/{idZonaEstacionamiento}', 'update');
    Route::delete('/zonaDeEstacionamiento/{idZonaEstacionamiento}', 'destroy');
});*/

Route::post('/zonaEstacionamiento', [ZonaDeEstacionamientoController::class, 'store']);