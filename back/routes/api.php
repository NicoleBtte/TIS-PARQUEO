<?php

use App\Http\Controllers\ConvocatoriaController;
use App\Http\Controllers\ParqueoController;
use App\Http\Controllers\ZonaDeEstacionamientoController;
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

Route::post('/zona', [ZonaDeEstacionamientoController::class, 'store']);
Route::get('/zona', function(){
    return view('zona');
});
/**Route::get('/sitio/{numSitios}', function ($numSitios) {
    $idZona= DB::table('zonaEstacionamiento')->latest('idzonaEstacionamiento')->first()->idzonaEstacionamiento;
    $sitio= new SitioController;
    $sitio->registroSitios($idZona, $numSitios);
    return view('zona');
 **/
Route::get('/sitio/{numSitios}', function ($numSitios) {
    $idZona = DB::table('zonaEstacionamiento')->latest('idzonaEstacionamiento')->value('idzonaEstacionamiento');
    $sitioController = new SitioController();
    $sitioController->registroSitios($idZona, $numSitios);
    return view('zona');
});
Route::post('/crearSitio',[SitioController::class,'registroSitios']);
