<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use App\Models\Administrador;
use App\Models\Cliente;
use App\Models\Operador;
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
        $notificacion = new Notificacion();
        $notificacion->emisor_notif = Auth::user()->name;
        $notificacion->mensaje_notif = $request->input('mensaje_notif');
        $notificacion->operador_idoperador = $request->input('operador_idoperador');
        $notificacion->cliente_idcliente = $request->input('cliente_idcliente');
        $notificacion->save();

        $receptor = null;
        if ($notificacion->operador_idoperador) {
            $receptor = 'operador';
        } elseif ($notificacion->cliente_idcliente) {
            $receptor = 'cliente';
        }

        if ($receptor) {
            $mensaje = [
                'id_notificacion' => $notificaciones->idnotificaciones,
                'mensaje_notif' => $notificaciones->mensaje_notif,
                'emisor_notif' => $notificaciones->emisor_notif,
            ];
            $notificacionReceptor = new NotificacionNueva($mensaje);
            Notification::route('broadcast', $receptor)->notify($notificacionReceptor);
        }

        return response()->json([
            'success' => true,
            'message' => 'Notificación creada exitosamente',
            'data' => $notificaciones
        ]);
    }
}
