<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;
use App\Models\Pago;
use App\Models\Cliente;

class PagoController extends Controller
{
    //public $id=0;
    public function RegistroPago(Request $request){
        $cliente = Cliente::find($request->carnet);
        
        if($cliente){
            $deuda=$cliente->monto_a_pagar;
            $multa=$cliente->multa;
            $monto=$request->monto;
            if($monto<=($deuda+$multa)){
                //$id++;
                $pago=new Pago;
                //$pago->idtransaccion=$id;
                $pago->monto=$monto;
                $pago->fechaPago=Carbon::today()->format('Y-m-d');
                $pago->cliente_idcliente=$request->carnet;
                $pago->reporte_idreporte=DB::table('reporte')->latest('idreporte')->first()->idreporte;
                $pago->save();
                $cliente->fecha_pagado=Carbon::today()->format('Y-m-d');
                if($monto<$multa){
                    $cliente->multa=$multa-$monto;
                    $cliente->save();
                    $msg='Guardado exitoso, el cliente solo pago parte de la multa';
                }else if($monto==$multa){
                    $cliente->multa=0;
                    $cliente->save();
                    $msg='Guardado exitoso, el cliente solo pago el total la multa';
                }else if($monto>$multa){
                    $cliente->multa=0;
                    if(($monto-$multa)<$deuda){
                        $cliente->monto_a_pagar=$deuda-($monto-$multa);
                        $cliente->save();
                        $msg='Guardado exitoso, el cliente pago toda la multa y parte de su deuda';
                    }else if(($monto-$multa)==$deuda){
                        $cliente->monto_a_pagar=0;
                        $cliente->estado_pago=1;
                        $cliente->save();
                        $msg='Guardado exitoso, el cliente esta al dia';
                    }
                    
                }
            }else{
                $msg='Error: el monto excede la deuda total del cliente';
            }
        }else{
            $msg='Error: el cliente ingresado no existe';
        }

        return response()->json(['message'=>$msg]);
    }

}