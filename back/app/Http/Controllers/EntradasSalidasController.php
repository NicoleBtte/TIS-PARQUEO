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
        $entrada=new HistorialEntradasSalidas;
        $entrada->idhistorial=$request->id;
        $entrada->hora_ingreso_hist=Carbon::now()->format('H:i:s');//$request->horaentrada;
        $entrada->hora_salida_hist=null;//$request->horasalida;
        $entrada->fecha_ingreso=Carbon::today()->format('Y-m-d');//$request->fechaentrada;
        $entrada->fecha_salida=null;//$request->fechasalida;
        $entrada->cliente_id_cliente=$request->idcliente;//DB::table('auto')->select('cliente_idcliente')->where('placa_auto',$request->placa)->first();
        $entrada->save();
        
        return response()->json(['msg'=>'Genial, se guardo con exito']);
    }

    public function RegistroSalida(Request $request){
        $horaactual=Carbon::now()->format('H:i:s');
        $fechaactual=Carbon::today()->format('Y-m-d');
        DB::table('historial_entradas_salidas')
                ->where('cliente_id_cliente', $request->idcliente)
                ->whereNull('fecha_salida')
                ->update(['hora_salida_hist' => $horaactual, 'fecha_salida' => $fechaactual]);

        return response()->json(['msg'=>'Genial, se actualizo con exito']);
    }

    //store
    //index
    //update
    //destroy
}