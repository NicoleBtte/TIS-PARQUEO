<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use App\Models\Administrador;
use App\Models\Cliente;
use App\Models\Operador;
use App\Notifications\NotificacionNueva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class NotificacionController extends Controller
{
    public function indexSent(Request $request)
    {
        $id = $request->id;
        $notificaciones = Notificacion::where('idemisor', $id)->get();
        if( $notificaciones->isEmpty()){
            return response()->json(['message' => 'No se encontraron notificaciones'], 404);
        } else {
            return response()->json(json_encode($notificaciones));
        }
    }

    public function indexReceived(Request $request)
    {
        $id = $request->id;
        $notificaciones = Notificacion::where('idreceptor', $id)->get();
        if( $notificaciones->isEmpty()){
            return response()->json(['message' => 'No se encontraron notificaciones'], 404);
        } else {
            return response()->json(json_encode($notificaciones));
        }
    }

    public function store(Request $request)
    {
        $idcliente = $request->id;
        $parqueo_idparqueo = $request->idparqueo;
        $cliente = Cliente::find($idcliente);
        $operador = DB::table('operador as o')
            ->join('parqueo as p', 'o.parqueo_idparqueo', '=', 'p.idParqueo')
            ->where('o.parqueo_idparqueo', '=', $parqueo_idparqueo)
            ->select('o.idoperador', 'o.nombre_operador')
            ->first();
        
        $notificacion = new Notificacion();
        $notificacion->emisor_notif = $cliente->nombre_cliente;
        $notificacion->receptor_notif = $operador->nombre_operador;
        $notificacion->idemisor = $cliente->idcliente;
        $notificacion->idreceptor = $operador->idoperador;
        $notificacion->titulo_notif = $request->titulo_notif;
        $notificacion->mensaje_notif = $request->mensaje_notif;
        $notificacion->fecha_notif = date('Y-m-d');
        $notificacion->save();

        /*$emisor = $notificacion->emisor_notif;
        $titulo = $notificacion->titulo_notif;
        $mensaje = $notificacion->mensaje_notif;
        $id = $operador->idoperador;
        $notificacionReceptor = new NotificacionNueva($emisor, $titulo, $mensaje);
        Notification::route('broadcast', 'user.'.$id)->notify($notificacionReceptor);*/

        return response()->json([
            'success' => true,
            'message' => 'Notificación creada exitosamente',
            'data' => $notificacion
        ]);
    }

    public function storeRespuesta(Request $request)
    {
        $idcliente = $request->idreceptor;
        $idoperador = $request->idemisor;
        $cliente = Cliente::find($idcliente);
        $operador = Operador::find($idoperador);
        
        $notificacion = new Notificacion();
        $notificacion->emisor_notif = $operador->nombre_operador;
        $notificacion->receptor_notif = $cliente->nombre_cliente;
        $notificacion->idemisor = $operador->idoperador;
        $notificacion->idreceptor = $cliente->idcliente;
        $notificacion->titulo_notif = $request->titulo_notif;
        $notificacion->mensaje_notif = $request->mensaje_notif;
        $notificacion->fecha_notif = date('Y-m-d');
        $notificacion->save();

        return response()->json([
            'success' => true,
            'message' => 'Notificación creada exitosamente',
            'data' => $notificacion
        ]);
    }
}
