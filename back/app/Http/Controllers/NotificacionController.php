<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use App\Models\Administrador;
use App\Models\Cliente;
use Illuminate\Http\Request;


class NotificacionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $notifications = $user->notifications()->paginate(10);
        $response = [];
        foreach ($notifications as $notification) {
            $response[] = [
                'id' => $notification->id,
                'emisor' => $notification->data['emisor_notif'],
                'mensaje' => $notification->data['mensaje_notif'],
                'fecha' => $notification->created_at->format('d/m/Y H:i:s')
            ];
        }
        return response()->json($response);
    }

    public function store(Request $request)
    {
        $notificacion = new Notificacion();
        $notificacion->emisor_notif = Auth::user()->name;
        $notificacion->mensaje_notif = $request->input('mensaje_notif');
        $notificacion->administrador_idadministrador = $request->input('administrador_idadministrador');
        $notificacion->cliente_idcliente = $request->input('cliente_idcliente');
        $notificacion->save();

        $receptor = null;
        if ($notificacion->administrador_idadministrador) {
            $receptor = 'administrador';
        } elseif ($notificacion->cliente_idcliente) {
            $receptor = 'cliente';
        }

        if ($receptor) {
            $mensaje = [
                'id_notificacion' => $notificacion->idnotificaciones,
                'mensaje_notif' => $notificacion->mensaje_notif,
                'emisor_notif' => $notificacion->emisor_notif,
            ];
            $notificacionReceptor = new NotificacionNueva($mensaje);
            Notification::route('broadcast', $receptor)->notify($notificacionReceptor);
        }

        return response()->json([
            'success' => true,
            'message' => 'Notificación creada exitosamente',
            'data' => $notificacion
        ]);
    }
}
