<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use App\Models\Administrador;
use App\Models\Cliente;
use App\Models\Operador;
use App\Notifications\NotificacionNueva;
use Illuminate\Http\Request;

class NotificacionController extends Controller
{
    public function indexSent(Request $request)
    {
        $rol = $request->rol;
        $id = $request->idemisor;
        if($rol == "admin"){
            $administrador = Administrador::find($id);
            $notificaciones = DB::table('notificaciones')
                ->where('data->emisor_notif', $administrador->nombre_administrador)
                ->paginate(10);
        }elseif($rol == "operador"){
            $operador = Operador::find($id);
            $notificaciones = DB::table('notificaciones')
                ->where('data->emisor_notif', $operador->nombre_operador)
                ->paginate(10);
        }else{
            $cliente = Cliente::find($id);
            $notificaciones = DB::table('notificaciones')
                ->where('data->emisor_notif', $cliente->nombre_cliente)
                ->paginate(10);
        }
        $response = [];

        foreach ($notificaciones as $notificacion) {
        $response[] = $notificacion->data;
        }
        return response()->json($response);
    }

    public function indexReceived(Request $request)
    {
        $rol = $request->rol;
        $id = $request->idreceptor;
        if($rol == "admin"){
            $administrador = Administrador::find($id);
            $notificaciones = DB::table('notificaciones')
                ->where('data->receptor_notif', $administrador->nombre_administrador)
                ->paginate(10);
        }elseif($rol == "operador"){
            $operador = Operador::find($id);
            $notificaciones = DB::table('notificaciones')
                ->where('data->receptor_notif', $operador->nombre_operador)
                ->paginate(10);
        }else{
            $cliente = Cliente::find($id);
            $notificaciones = DB::table('notificaciones')
                ->where('data->receptor_notif', $cliente->nombre_cliente)
                ->paginate(10);
        }
        $response = [];

        foreach ($notificaciones as $notificacion) {
        $response[] = $notificacion->data;
        }
        return response()->json($response);
    }

    public function store(Request $request)
    {
        $idUser = $request->id;
        $idparqueo = $request->idparqueo;
        $cliente = Cliente::find($idUser);
        $operador = Operador::find($idparqueo);
        
        $notificacion = new Notificacion();
        $notificacion->emisor_notif = $cliente->nombre_cliente;
        $notificacion->repector_notif = $operador->nombre_operador;
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
}
