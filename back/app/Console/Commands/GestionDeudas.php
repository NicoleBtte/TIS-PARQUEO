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
        if($convocatoria->estado_convocatoria == 0){
            $msg='Los clientes: ';
            $clientes=Cliente::all();
            $pagoMes=$convocatoria->pago_mensual;
            foreach($clientes as $cliente){
                $deuda=$cliente->monto_a_pagar;
                $nombre=$cliente->nombre_cliente;
                $cliente->monto_a_pagar=$deuda+$pagoMes;
                $cliente->save();
                $msg=$msg.', '.$nombre;
            }
        }
        return $msg.'.';
    }
}
