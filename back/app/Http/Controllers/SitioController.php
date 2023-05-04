<?php

namespace App\Http\Controllers;

use App\Models\Sitio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SitioController extends Controller
{
   public function registroSitios($id,$numSitios) {
    $i=1;    
    while($i<=$numSitios){
        $sitio = new Sitio();
        $sitio->zonaEstacionamiento_idzonaEstacionamiento=$id;
        $sitio->numero=$i;
        $sitio->save();
        sleep(0.5);



        $i++;
        
    }

   }


   public static function asignarSitio(int $idCliente){

    
      $sitioParaAsignar= DB::table('sitio')->whereNull('cliente_idcliente')->first();
      $IDsitio=$sitioParaAsignar->idsitio;
      DB::table('sitio')->where('idsitio',$IDsitio)-> update(['cliente_idcliente'=>$idCliente]);
      return "sitio{$sitioParaAsignar->numero} en la zona {$sitioParaAsignar->zonaEstacionamiento_idzonaEstacionamiento}";
   }


   public function listaClientes(){
    /**
     * nombre, paqueo, zona, sitio
    */
    $arreglo=DB::table('sitio')
    ->wherenNotNull('cliente_idcliente')
    ->join('zonaEstacionamiento', 'sitio.zonaEstacionamiento_idzonaEstacionamiento', '=', 'zonaEstacionamiento.idzonaEstacionamiento')
    ->join('cliente', 'sitio.cliente_idcliente', '=', 'cliente.idcliente')
    ->join('parqueo', 'zonaEstacionamiento.parqueo_idparqueo', '=', 'parqueo.idparqueo')
    ->select('cliente.idcliente','cliente.nombre_cliente', 'parqueo.nombre_parqueo', 'zonaEstacionamiento.nombre_zona_estacionamiento','sitio.numero')
                ->get();

   return response()->json(json_encode($arreglo));             

   }


   public function reasignar($idcliente, $idsitio){
      $sitio = Sitio::where('id', $idSitio)->first();
      $sitio->setAttribute('cliente_idcliente', $idcliente);

      $sitio->save();



   }


   public function listaSitios(){

     $arreglo2=DB::table('sitio')
    ->wherenNull('cliente_idcliente')
    ->join('zonaEstacionamiento', 'sitio.zonaEstacionamiento_idzonaEstacionamiento', '=', 'zonaEstacionamiento.idzonaEstacionamiento')
    ->join('parqueo', 'zonaEstacionamiento.parqueo_idparqueo', '=', 'parqueo.idparqueo')
    ->select('idsitio','parqueo.nombre_parqueo', 'zonaEstacionamiento.nombre_zona_estacionamiento','sitio.numero')
                ->get();

   return response()->json(json_encode($arreglo2));    
   }

}