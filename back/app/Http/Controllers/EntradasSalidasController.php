<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HistorialEntradasSalidas;
use App\Models\Cliente;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;


class EntradasSalidasController extends Controller
{
    //public $id=0;
    public function RegistroEntrada(Request $request){
        //$id=$id+1;
        //$cliente = Cliente::find($request->idcliente);
        $validacion=DB::table('historial_entradas_salidas')
                            ->where('cliente_idcliente', $request->idcliente)
                            ->latest('idhistorial')
                            ->first();
        if($validacion!=null && $validacion->fecha_salida==null){
            $msg="Error: No hay registro de salida del cliente. No se puede registrar una nueva entrada";
        } 
        if(($validacion!=null && $validacion->fecha_salida!=null) || $validacion==null){
            $entrada=new HistorialEntradasSalidas;
            //$entrada->idhistorial=$request->id;
            //$entrada->hora_ingreso_hist=Carbon::now()->format('H:i:s');//$request->horaentrada;
            //$entrada->hora_salida_hist=null;$request->horasalida;
            $entrada->fecha_ingreso=date('Y-m-d H:i:s');//Carbon::today()->format('Y-m-d');//$request->fechaentrada;
            $entrada->fecha_salida=null;//$request->fechasalida;
            $entrada->cliente_idcliente=$request->idcliente;//DB::table('auto')->select('cliente_idcliente')->where('placa_auto',$request->placa)->first();
            $entrada->save();
            $msg="Genial, se guardo con exito";
        }
        
        return response()->json(['msg'=>'Genial, se guardo con exito']);
    }

    public function RegistroSalida(Request $request){
        //$horaactual=Carbon::now()->format('H:i:s');
        $fechaactual=date('Y-m-d H:i:s');//Carbon::today()->format('Y-m-d');
        DB::table('historial_entradas_salidas')
                ->where('cliente_idcliente', $request->idcliente)
                ->whereNull('fecha_salida')
                ->update(['fecha_salida' => $fechaactual]);

        return response()->json(['msg'=>'Genial, se actualizo con exito']);
    }

    public function ConsultaEntradasSalidas(){
        $consulta = HistorialEntradasSalidas::all();
        return response()->json(json_encode($consulta));
    }

    //store
    //index
    //update
    //destroy
}