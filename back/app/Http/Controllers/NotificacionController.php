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
        $idadministrador = $request -> id;
        $notificaciones = Notificacion::where('idemisor', $idadministrador)->get();
        $notificacionesUnicas = [];
        foreach ($notificaciones as $notificacion) {
            $existe = false;
            foreach ($notificacionesUnicas as $unica) {
                if ($unica->titulo_notif === $notificacion->titulo_notif && $unica->mensaje_notif === $notificacion->mensaje_notif) {
                    $unica->idemisor = 0;
                    $existe = true;
                    break;
                }
            }
            if (!$existe) {
                $notificacionesUnicas[] = $notificacion;
            }
        }
        foreach($notificacionesUnicas as $notificacion){
            if($notificacion->idemisor === 0){
                $idAuxiliar = $notificacion->idreceptor;
                if(Cliente::find($idAuxiliar)){
                    $notificacion->receptor_notif = "Clientes";  
                }else{
                    $notificacion->receptor_notif = "Personal";
                }
            }
        }
        if (count($notificacionesUnicas) === 0) {
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
        //$notificacion->emisor_notif = $cliente->nombre_cliente;
        $notificacion->emisor_notif = $cliente->nombre_cliente. ' ' . $cliente->apellidos_cliente;;
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
        //$notificacion->receptor_notif = $cliente->nombre_cliente;
        $notificacion->receptor_notif = $cliente->nombre_cliente . ' ' . $cliente->apellidos_cliente;
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

    public function storeMensajeIndividual(Request $request)
    {
        $idreceptor = $request->idreceptor;
        $idadmin = $request->idemisor;
        $administrador = Administrador::find($idadmin);
        $receptor = Operador::where('idoperador', $idreceptor)->first();
        $rol = '';

        if (!$receptor) {
            $receptor = Guardia::where('idguardia', $idreceptor)->first();
            if (!$receptor) {
                $receptor = Cliente::where('idcliente', $idreceptor)->first();
                $rol = 'Cliente';
            }else{
                $rol = 'Guardia';
            }
        }else{
            $rol = 'Operador';
        }
        
        if($receptor && $rol!=''){

            switch ($rol) {
                case 'Operador':
                    $notificacion = new Notificacion();
                    $notificacion->emisor_notif = $administrador->nombre_administrador;
                    $notificacion->receptor_notif = $receptor->nombre_operador;
                    $notificacion->idemisor = $administrador->idadministrador;
                    $notificacion->idreceptor = $receptor->idoperador;
                    $notificacion->titulo_notif = $request->titulo_notif;
                    $notificacion->mensaje_notif = $request->mensaje_notif;
                    $notificacion->fecha_notif = date('Y-m-d');
                    $notificacion->save();
                    break;
                case 'Guardia':
                    $notificacion = new Notificacion();
                    $notificacion->emisor_notif = $administrador->nombre_administrador;
                    $notificacion->receptor_notif = $receptor->nombre_guardia;
                    $notificacion->idemisor = $administrador->idadministrador;
                    $notificacion->idreceptor = $receptor->idguardia;
                    $notificacion->titulo_notif = $request->titulo_notif;
                    $notificacion->mensaje_notif = $request->mensaje_notif;
                    $notificacion->fecha_notif = date('Y-m-d');
                    $notificacion->save();
                    break;
                default:
                    $notificacion = new Notificacion();
                    $notificacion->emisor_notif = $administrador->nombre_administrador;
                    //$notificacion->receptor_notif = $receptor->nombre_cliente;
                    $notificacion->receptor_notif = $receptor->nombre_cliente. ' ' . $receptor->apellidos_cliente;;
                    $notificacion->idemisor = $administrador->idadministrador;
                    $notificacion->idreceptor = $receptor->idcliente;
                    $notificacion->titulo_notif = $request->titulo_notif;
                    $notificacion->mensaje_notif = $request->mensaje_notif;
                    $notificacion->fecha_notif = date('Y-m-d');
                    $notificacion->save();
                    break;
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Notificación creada exitosamente',
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Notificación no pudo crearse'
            ]);
        }
    }
    public function indexReceivedOperador(Request $request)
    {
        $id = $request->id;
        $administradores = Administrador::pluck('idadministrador')->toArray();
        
        $notificaciones = Notificacion::where('idreceptor', $id)
            ->whereIn('idemisor', $administradores)
            ->get();
            
        if ($notificaciones->isEmpty()) {
            return response()->json(['message' => 'No se encontraron notificaciones'], 404);
        } else {
            return response()->json(json_encode($notificaciones));
        }
    }

    public function indexQuejas(Request $request)
    {
        $id = $request->id;
        $clientes = Cliente::pluck('idcliente')->toArray();
        
        $notificaciones = Notificacion::where('idreceptor', $id)
            ->whereIn('idemisor', $clientes)
            ->get();
            
        if ($notificaciones->isEmpty()) {
            return response()->json(['message' => 'No se encontraron notificaciones'], 404);
        } else {
            return response()->json(json_encode($notificaciones));
        }
    }

}
