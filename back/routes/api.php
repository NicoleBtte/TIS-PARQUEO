<?php

use App\Http\Controllers\ConvocatoriaController;
use App\Http\Controllers\ParqueoController;
use App\Http\Controllers\ZonaDeEstacionamientoController;
use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\SitioController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\OperadorController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EntradasSalidasController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\GuardiaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    //Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout', [ClienteController::class, 'logout']);
    Route::post('/logoutadmin', [AdminController::class, 'logout']);
    Route::post('/logoutoperador', [OperadorController::class, 'logout']);
    Route::post('/logoutguardia', [GuardiaController::class, 'logout']);
});


Route::get('/signin', function () {
    return view('signin');
});
Route::post('/register', [ClienteController::class, 'store']);
Route::post('/login', [ClienteController::class, 'login']);
Route::post('/loginadmin', [AdminController::class, 'login']);
Route::post('/loginoperador', [OperadorController::class, 'login']);
Route::post('/showcliente', [ClienteController::class, 'show']);
Route::post('/loginguardia', [GuardiaController::class, 'login']);

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

Route::post('/entrada', [EntradasSalidasController::class, 'RegistroEntrada']);
Route::post('/salida', [EntradasSalidasController::class, 'RegistroSalida']);
Route::get('/consultaEntradasSalidas', [EntradasSalidasController::class, 'ConsultaEntradasSalidas']);
Route::get('/entrada', function(){
    return view('EntradaSalida');
});

Route::post('/pagar', [PagoController::class, 'RegistroPago']);
Route::get('/consultaPagos', [PagoController::class, 'consultaPagos']);
Route::post('/consultaPagosCliente', [PagoController::class, 'consultaPagosCliente']);
Route::post('/updatePago', [PagoController::class, 'updatePago']);
Route::get('/updatePago', function(){
    return view('updatePago');
});
Route::delete('/eliminarPago', [PagoController::class, 'eliminarPago']);
Route::get('/consultaEstadoClientes', [PagoController::class, 'consultaEstadoClientes']);
Route::post('/consultaComprobante', [PagoController::class, 'consultaComprobante']);


Route::get('/convocatorias', [ConvocatoriaController::class, 'index']);
Route::post('/convocatoria', [ConvocatoriaController::class, 'store']);
Route::get('/convocatoria/{idConvocatoria}', [ConvocatoriaController::class, 'show']);
Route::put('/convocatoria/{idConvocatoria}', [ConvocatoriaController::class, 'update']);
Route::delete('/convocatoria/{idConvocatoria}', [ConvocatoriaController::class, 'destroy']);
Route::get('/convocatoriaActual', [ConvocatoriaController::class, 'consultarConvocatoriaActiva']);
Route::put('/convocatoriaRegistrarse',[ConvocatoriaController::class, 'registrarseConvo']);
Route::post('/descargarConvocatoria',[ConvocatoriaController::class, 'descargarPdfconvocatoria']);

Route::get('/parqueos', [ParqueoController::class ,'index']);
Route::post('/parqueo',  [ParqueoController::class ,'store']);
Route::get('/parqueo/{idParqueo}', [ParqueoController::class ,'show']);
Route::put('/parqueo/{idParqueo}',  [ParqueoController::class ,'update']);
Route::delete('/parqueo/{idParqueo}', [ParqueoController::class ,'destroy']);
Route::post('/verMapaParqueo', [ParqueoController::class ,'verImagen']);

Route::get('/zonaDeEstacionamientos/{idParqueo}', [ZonaDeEstacionamientoController::class,'index']);
Route::get('/zonaDeEstacionamiento/{idZonaEstacionamiento}', [ZonaDeEstacionamientoController::class,'show']);
Route::put('/zonaDeEstacionamiento/{idZonaEstacionamiento}', [ZonaDeEstacionamientoController::class,'update']);
Route::delete('/zonaDeEstacionamiento/{idZonaEstacionamiento}', [ZonaDeEstacionamientoController::class,'destroy']);
Route::post('/zona', [ZonaDeEstacionamientoController::class, 'store']);
Route::get('/zona', function(){
    return view('zona');
});
Route::post('/crearSitio',[SitioController::class,'registroSitios']);
Route::get('/consultaClienteSitio',[SitioController::class,'listaClientes']);
Route::get('/consultaSitios',[SitioController::class,'listaSitios']);
Route::post('/reasignarSitio',[SitioController::class,'reasignar']);

Route::post('/notificaciones',[NotificacionController::class, 'store']);
Route::post('/notificacionesResp',[NotificacionController::class, 'storeRespuesta']);
Route::get('/notificacionesEnvia',[NotificacionController::class, 'indexSent']);
Route::get('/notificacionesRecibe',[NotificacionController::class, 'indexReceived']);

Route::get('/miSitio',[SitioController::class,'obtenerMiSitio']);

//Gestion usuarios
Route::get('/operadores', [OperadorController::class, 'showAll']);
Route::post('/crearOperador', [OperadorController::class, 'crear']);
Route::delete('/deleteOperador', [OperadorController::class, 'eliminarOperador']);
Route::get('/guardias', [GuardiaController::class, 'showAll']);
Route::post('/crearGuardia', [GuardiaController::class, 'crear']);
Route::delete('/deleteGuardia', [GuardiaController::class, 'eliminarGuardia']);

//dejar sin sitio
Route::post('/dejarSinSitio',[SitioController::class,'dejarSinSitio']);
Route::get('/consultaClienteSinSitio',[SitioController::class, 'listaClienteSinSitio']);
Route::post('/asignarManual',[SitioController::class, 'asignarManual']);