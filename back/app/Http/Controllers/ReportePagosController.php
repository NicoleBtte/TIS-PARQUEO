<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;
use App\Models\Pago;
use App\Models\Cliente;
use Illuminate\Support\Facades\Storage;

class ReportePagosController extends Controller
{
    public static function reportePagos(Request $request){
        $fechaInicio=$request->fechaInicio;
        $fechaFin=$request->fechaFin;
        $consultaPago=DB::table('transaccion')->whereBetween('fechaPago', [$fechaInicio, $fechaFin])->select('fechaPago', 'monto', 'devolucion')->get();
        foreach($consultaPago as $pago){
            $monto=$pago->monto;
            $devolucion=$pago->devolucion;
            $neto=$monto-$devolucion;
            $pago->ingresoNeto=$neto;
        }
        return response()->json(json_encode($consultaPago));
    }

    public static function guardarReportePagos(Request $request){
        //$array=json_decode($json, true);

        $guardado=DB::table('reporte')->insert([
            'ingreso_mes' => null,
            'mes' => null,
            'datos' => $request->datos,
            'operador_idoperador' => $request->idoperador
        ]);
        return response($guardado);
    }

}