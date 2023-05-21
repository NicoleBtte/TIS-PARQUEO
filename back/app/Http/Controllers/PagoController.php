<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;
use App\Models\Pago;
use App\Models\Cliente;
use App\Http\Controllers\ReportePagosController;
use Illuminate\Support\Facades\Storage;

class PagoController extends Controller
{
    //public $id=0;
    public function RegistroPago(Request $request){
        $cliente = Cliente::find($request->carnet);
        $msg='Ocurrio un error, vuelva a intentarlo mas tarde';
        if($cliente){
            $saldo=$cliente->saldo;
            $deuda=$cliente->monto_a_pagar;
            $multa=$cliente->multa;
            $monto=$request->monto;
            if($monto<=($deuda+$multa+$saldo)){
                $mensualidad=DB::table('convocatoria')->latest('idconvocatoria')->first();
                if((($monto-$multa)%($mensualidad->pago_mensual))==0){
                    $meses_cancelados=$cliente->meses_cancelados;
                    if($meses_cancelados==null){
                        $meses_cancelados="";
                    }
                    
                    //$id++;
                    $pago=new Pago;
                    //$pago->idtransaccion=$id;
                    $pago->monto=$monto;
                    $pago->fechaPago=Carbon::today()->format('Y-m-d');
                    if($request->tipo_de_pago==1){
                        $pago->comprobante = null;
                    }else{
                        $archivo = $request->file('imagen');
                        $ruta = Storage::disk('uploads')->putFile('comprobantes', $archivo);
                        $pago->comprobante = $ruta;
                    }
                    $pago->tipo_de_pago= $request->tipo_de_pago;
                    $pago->cliente_idcliente=$request->carnet;
                    //$pago->reporte_idreporte=DB::table('reporte')->latest('idreporte')->first()->idreporte;
                    //$pago->save();
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
                            $calculoMeses=($this->calcularMeses($deuda, ($monto-$multa), $mensualidad->pago_mensual, 0));
                            $cliente->meses_cancelados=$meses_cancelados.$calculoMeses;
                            $cliente->save();
                            $msg='Guardado exitoso, el cliente pago toda la multa y parte de su deuda: meses => '.$calculoMeses;
                        }else if(($monto-$multa)==$deuda){
                            $cliente->monto_a_pagar=0;
                            $cliente->estado_pago=1;
                            $calculoMeses=($this->calcularMeses($deuda, ($monto-$multa), $mensualidad->pago_mensual, 0));
                            $cliente->meses_cancelados=$meses_cancelados.$calculoMeses;
                            $cliente->save();
                            $msg='Guardado exitoso, el cliente esta al dia: meses => '.$calculoMeses;
                        }else if((($monto-$multa)>$deuda)){
                            $cliente->monto_a_pagar=0;
                            $cliente->estado_pago=1;
                            $adelanto=$monto-($deuda+$multa);
                            $mesAdelantado=($adelanto/$mensualidad->pago_mensual);
                            $beforeUpdate=$cliente->mesAdelantado;
                            $cliente->mesAdelantado=(($cliente->mesAdelantado)+$mesAdelantado);
                            DB::table('cliente')->where('idcliente', $request->carnet)->update([
                                'fecha_lim_pago' => DB::raw("DATE_ADD(fecha_lim_pago, INTERVAL {$mesAdelantado} MONTH)")
                            ]);
                        
                            if($adelanto>=(0.5*$saldo)){
                                $cliente->saldo=$saldo-$adelanto;
                                $calculoMeses=($this->calcularMeses($deuda, ($monto-$multa), $mensualidad->pago_mensual, $beforeUpdate));
                                $cliente->meses_cancelados=$meses_cancelados.$calculoMeses;
                                $cliente->save();
                                $pago->descuento='10%';
                                $pago->devolucion=$monto*0.1;
                                $msg='Guardado exitoso, el cliente esta al dia e hizo un pago adelantado que merece un 10% de descuento: meses => '.$calculoMeses;
                            }else if(($adelanto<(0.5*$saldo)) && ($adelanto>=(0.25*$saldo))){
                                $cliente->saldo=$saldo-$adelanto;
                                $calculoMeses=($this->calcularMeses($deuda, ($monto-$multa), $mensualidad->pago_mensual, $beforeUpdate));
                                $cliente->meses_cancelados=$meses_cancelados.$calculoMeses;
                                $cliente->save();
                                $pago->descuento='5%';
                                $pago->devolucion=$monto*0.05;
                                $msg='Guardado exitoso, el cliente esta al dia e hizo un pago adelantado que merece un 5% de descuento: meses =>'.$calculoMeses;
                            }else{
                                $cliente->saldo=$saldo-$adelanto;
                                $calculoMeses=($this->calcularMeses($deuda, ($monto-$multa), $mensualidad->pago_mensual, $beforeUpdate));
                                $cliente->meses_cancelados=$meses_cancelados.$calculoMeses;
                                $cliente->save();
                                $msg='Guardado exitoso, el cliente esta al dia e hizo un pago adelantado pequeño: meses => '.$calculoMeses;
                            }
                        }
                        
                    }
                    $pago->meses_pagados=$calculoMeses;
                    $pago->save();
                }else{
                    $msg='Error: no se puede guardar montos pequeños, porfavor ingrese un monto exacto';
                }
            }else{
                $msg='Error: el monto excede la deuda total del cliente';
            }
        }else{
            $msg='Error: el cliente ingresado no existe';
        }
        if($cliente->saldo==0 && $cliente->monto_a_pagar==0){
            $msg=$msg.' Se completaron los pagos de la gestion';
        }
        return response()->json(['message'=>$msg]);
    }
    public function calcularMeses($deuda, $cuota, $mensualidad, $mesesadelanto){
        if($mesesadelanto>0){
            if($deuda==0){
                $mesactual=(date('n'))+($mesesadelanto);
            }else{
                $mesactual=(date('n'));
            }
        }else{
            $mesactual=date('n');
        }
        
        $mesesdeuda=($deuda/$mensualidad)-1;
        $mesespagados=($cuota/$mensualidad)-1;
        $iniciodeuda=$mesactual-$mesesdeuda;
        $mescancelado='';
        for ($i = 0; $i <= $mesespagados; $i++) {
            $mes=date('F', mktime(0, 0, 0, ($iniciodeuda+$i), 1));
            $mesesTraducidos = [
                "January" => "Enero",
                "February" => "Febrero",
                "March" => "Marzo",
                "April" => "Abril",
                "May" => "Mayo",
                "June" => "Junio",
                "July" => "Julio",
                "August" => "Agosto",
                "September" => "Septiembre",
                "October" => "Octubre",
                "November" => "Noviembre",
                "December" => "Diciembre"
            ];

            if (array_key_exists($mes, $mesesTraducidos)) {
                $mesTraducido = $mesesTraducidos[$mes];
            }
            $mescancelado=$mescancelado.$mesTraducido.' ';
        }
        return $mescancelado;
    }

    public function consultaPagos(){
        $consultaPago= Pago::all();
        //$json=json_encode($consultaPago);
        //return view('verPagos')->with('json', $json);
        return response()->json(json_encode($consultaPago));
    }

    public function consultaEstadoClientes(){
        $consultaCliente=Cliente::all();
        /*foreach($consultaCliente as $cliente){
            $mesescancelados="";
            $pagos=DB::table('transaccion')->where('cliente_idcliente',$cliente->idcliente)->select('meses_pagados')->get();
            foreach($pagos as $pago){
                $mesescancelados=$mesescancelados.$pago->meses_pagados;
            }
            $cliente->meses_cancelados=$pagos;
        }*/
        /*
        $consultaCliente = Cliente::with(['transacciones' => function ($query) {
            $query->select('meses_pagados', 'cliente_idcliente');
        }])->get();
        
        foreach ($consultaCliente as $cliente) {
            $mesesCancelados = $cliente->transacciones->pluck('meses_pagados')->implode('');
            $cliente->meses_cancelados = $mesesCancelados;
            $cliente->unsetRelation('transacciones');
        }
        */
        return response()->json(json_encode($consultaCliente));
    }
    
    public function consultaPagosCliente(Request $request){
        $consultaPagoCliente=DB::table('transaccion')->where('cliente_idcliente', '=', $request->idcliente)->get();
        return response()->json(json_encode($consultaPagoCliente));
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

    public function consultaComprobante(Request $request){
        echo("aquii lo que sea".$request->idtransaccion);
        $consultaComprobante=Pago::find($request->idtransaccion);
        $json=json_encode($consultaComprobante);
        return response()->json(json_encode($json));
        //return view('verPagos')->with('json',$json);
    }
}