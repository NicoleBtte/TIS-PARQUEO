<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use App\Models\Administrador;
use App\Models\Cliente;
use App\Models\Operador;
use App\Models\Guardia;
use App\Notifications\NotificacionNueva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class NotificacionController extends Controller
{
    public function notifEnviadosAdmin(Request $request){
        $idadministrador = $request -> idadministrador;
        $notificaciones = Notificacion::where('emisor_id', $idadministrador)->get();
        $notificacionesUnicas = [];

        foreach ($notificaciones as $notificacion) {
            if (!in_array($notificacion->mensaje_notif, $notificacionesUnicas)&&
                !in_array($notificacion->titulo_notif, $notificacionesUnicas)) {
                $notificacionesUnicas[] = $notificacion->mensaje_notif;
            }
        }
        if( $notificacionesUnicas->isEmpty()){
            return response()->json(['message' => 'No se encontraron notificaciones'], 404);
        } else {
            return response()->json(json_encode($notificacionesUnicas));
        }
    }

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

    public function anuncioClientes(Request $request){
        $titulo_notif = $request->titulo_notif;
        $mensaje_notif = $request->mensaje_notif;
        $idadministrador = $request->idadministrador;
        $admin = Administrador::find($idadministrador);
        $nombre_administrador = $admin->nombre_administrador;
        $clientes = Cliente::all();
        foreach ($clientes as $cliente) {
            $idcliente = $cliente->idcliente;
            $nombre_cliente = $cliente->nombre_cliente;
            $this->mandarMensaje($idcliente, $idadministrador, $nombre_cliente, $nombre_administrador,
            $titulo_notif, $mensaje_notif);
        }
    }

    public function anuncioPersonal(Request $request){
        $titulo_notif = $request->titulo_notif;
        $mensaje_notif = $request->mensaje_notif;
        $idadministrador = $request->idadministrador;
        $admin = Administrador::find($idadministrador);
        $nombre_administrador = $admin->nombre_administrador;
        $operadores = Operador::all();
        foreach ($operadores as $operador) {
            $idoperador = $operador->idoperador;
            $nombre_operador = $operador->nombre_operador;
            $this->mandarMensaje($idoperador, $idadministrador, $nombre_operador, $nombre_administrador,
            $titulo_notif, $mensaje_notif);
        }
        $guardias = Guardia::all();
        foreach ($guardias as $guardia) {
            $idguardia = $guardia->idguardia;
            $nombre_guardia = $guardia->nombre_guardia;
            $this->mandarMensaje($idguardia, $idadministrador, $nombre_guardia, $nombre_administrador,
            $titulo_notif, $mensaje_notif);
        }
    }

    public function mandarMensaje(int $idreceptor,int $idemisor, string $receptor_notif, string $emisor_notif,
    string $titulo_notif, string $mensaje_notif){
        $notificacion = new Notificacion();
        $notificacion->emisor_notif = $emisor_notif;
        $notificacion->receptor_notif = $receptor_notif;
        $notificacion->idemisor = $idemisor;
        $notificacion->idreceptor = $idreceptor;
        $notificacion->titulo_notif = $titulo_notif;
        $notificacion->mensaje_notif = $mensaje_notif;
        $notificacion->fecha_notif = date('Y-m-d');
        $notificacion->save();
    }
}
