<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Cliente;

class GestionDeudas extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gestion';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gestion de deudas y multas';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $convocatoria=DB::table('convocatoria')->orderBy('idConvocatoria', 'desc')->first();
        $fechaActual=date('Y-m-d');
        if(($convocatoria->fecha_pago < $fechaActual) && ($fechaActual < $convocatoria->fecha_fin_gestion)){
            $msg='Los clientes: ';
            $clientes=Cliente::all();
            $pagoMes=$convocatoria->pago_mensual;
            foreach($clientes as $cliente){
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
                $msg=$msg.', '.$nombre;
            }
        }
        return $msg.'.';
    }
}
