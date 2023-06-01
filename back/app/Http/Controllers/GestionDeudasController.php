<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Cliente;

class GestionDeudasController extends Controller
{
    public function calcularDeudas(){
        $convocatoria=DB::table('convocatoria')->orderBy('idConvocatoria', 'desc')->first();
        $fechaActual=date('Y-m-d');
        //if(($convocatoria->fecha_inicio_gestion < $fechaActual) && ($fechaActual < $convocatoria->fecha_fin_gestion)){
            $fila=DB::table('gestion_deudas')->whereNotNull('fecha_calculo')->first();
            if($fila!=null){  
                $fecha_calculo=$fila->fecha_calculo;
                if($fecha_calculo<=$fechaActual){
                    $clientes=Cliente::all();
                    foreach($clientes as $cliente){
                        if($cliente->saldo>0){
                            if($cliente->mesAdelantado>0){
                                $cliente->mesAdelantado=$cliente->mesAdelantado-1; 
                            }else{
                                if($cliente->monto_a_pagar>0){
                                    $cliente->multa=$cliente->multa+$convocatoria->multa_mensual;
                                }
                                $cliente->monto_a_pagar=$cliente->monto_a_pagar+$convocatoria->pago_mensual;
                                $cliente->saldo=$cliente->saldo-$convocatoria->pago_mensual;
                                $cliente->fecha_lim_pago=date('Y-m-d', strtotime($cliente->fecha_lim_pago . ' +1 month'));
                            }
                            $cliente->save();
                        }
                    }
                    $nueva_fecha_calculo=date('Y-m-d', strtotime($fecha_calculo . ' +1 month'));
                    DB::table('gestion_deudas')->whereNotNull('fecha_calculo')->update(['fecha_calculo' => $nueva_fecha_calculo]);
                    $msg='Se realizo el calculo con exito';
                }else{
                    $msg='Aun no es tiempo para realizar el calculo';
                }
            }else{
                $msg='No existe una fecha de calculo. Talvez no exista una convocatoria';
            }
            //$msg='La gestion de deudas aun no empieza, no se puede hacer ningun calculo';
        //}
        return response()->json(['message' => $msg]);
    }
}
