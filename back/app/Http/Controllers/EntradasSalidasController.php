<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HistorialEntradasSalidas;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class ClienteController extends Controller
{
    public $id=0;
    public function RegistroEntrada(Request $request){
        $id=$id+1;
        $registro=new HistorialEntradasSalidas;
        $registro->idhistorial=$id;
        $registro->hora_ingreso_hist=$request->horaentrada;
        $registro->hora_salida_hist=$request->horasalida;
        $registro->fecha_ingreso=$request->fechaentrada;
        $registro->fecha_salida=$request->fechasalida;
        $registro->cliente_idcliente= DB::table('auto')->select('cliente_idcliente')->where('placa_auto',$request->placa)->first();
        $registro->save();
    }

    //store
    //index
    //update
    //destroy
}