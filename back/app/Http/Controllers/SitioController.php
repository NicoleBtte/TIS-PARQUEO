<?php

namespace App\Http\Controllers;

use App\Models\Sitio;
use Illuminate\Http\Request;

class SitioController extends Controllers
{
   public function registroSitios($id, $numSitios) {
    $i=1;    
    while($i<=$numSitios){
        $sitio = new Sitio();
        $sitio->zonaEstacionamiento_idzonaEstacionamiento=$id;
        $sitio->numero=$i;
        $sitio->save();

        $i++;
        
    }

   }


   public function asignarSitio(Request $request){

    
      $sitioParaAsignar= DB::table('sitio')->whereNull('cliente_idcliente')->first()->idSitio;
      DB::table('sitio')->where('idSitio',$sitioParaAsignar)-> update(['cliente_idcliente'=>$request->idcliente]);
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


   public function reasignar($cliente){


   }


   public function listaSitios(){

     $arreglo2=DB::table('sitio')
    ->wherenNull('cliente_idcliente')
    ->join('zonaEstacionamiento', 'sitio.zonaEstacionamiento_idzonaEstacionamiento', '=', 'zonaEstacionamiento.idzonaEstacionamiento')
    ->join('parqueo', 'zonaEstacionamiento.parqueo_idparqueo', '=', 'parqueo.idparqueo')
    ->select('parqueo.nombre_parqueo', 'zonaEstacionamiento.nombre_zona_estacionamiento','sitio.numero')
                ->get();

   return response()->json(json_encode($arreglo2));    
   }

}