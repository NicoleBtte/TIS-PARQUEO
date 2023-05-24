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
        //}
    
    }
}
