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
        $totalneto=0;
        foreach($consultaPago as $pago){
            $monto=$pago->monto;
            $devolucion=$pago->devolucion;
            $neto=$monto-$devolucion;
            $pago->ingresoNeto=$neto;
            $totalneto=$totalneto+$neto;
        }
        $jsonconsultaPago=json_encode($consultaPago);
        $jsontotalneto=json_encode($totalneto);

        return response([$jsonconsultaPago, $jsontotalneto]);
    }

    public static function guardarReportePagos(Request $request){
        //$array=json_decode($json, true);

        $guardado=DB::table('reporte')->insert([
            'ingreso_mes' => $request->data[1],
            'mes' => null,
            'datos' => $request->data[0],
            'operador_idoperador' => null//$request->idoperador
        ]);
        return response($guardado);
    }

    public function totalIngresos(){
        $pagos=DB::table('transaccion')->get();
        $total=0;
        foreach($pagos as $pago){
            $monto=$pago->monto;
            $devolucion=$pago->devolucion;
            $neto=$monto-$devolucion;
            $total=$total+$neto;
        }
        return response()->json($total);
    }

}
//meses pagados para estado de cliente, concatenar los meses BIEN
//total de pagos hasta el momento
//gestion de dudas, fecha pago = inicio de gestion