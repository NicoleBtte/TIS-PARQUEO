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
        $msg='Ocurrio un error, vuelva a intentarlo mas tarde';
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
                $archivo = $request->file('imagen');
                $ruta = Storage::disk('uploads')->putFile('comprobantes', $archivo);
                $pago->comprobante = $ruta;
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

    public function consultaPagos(){
        $consultaPago= Pago::all();
        //$json=json_encode($consultaPago);
        //return view('verPagos')->with('json', $json);
        return response()->json(json_encode($consultaPago));
    }

    public function consultaEstadoClientes(){
        $consultaCliente=Cliente::all();
        return response()->json(json_encode($consultaCliente));
    }

    public function updatePago(Request $request){
        $actualizar=Pago::find($request->idtransaccion);
        $archivo = $request->file('imagen');
        $msg=$actualizar->guardarArchivo($archivo);
        return response()->json(['message'=>"Archivo guardado en la ruta {$msg}"]);
    }

    public function eliminarPago(Request $request){
        $eliminar=Pago::find($request->idtransaccion);
        $eliminar->delete();
        return response()->json(['message'=>'Registro borrado con exito']);
    }
}