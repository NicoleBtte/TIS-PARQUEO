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
       // $sitio->cliente_idcliente=ninguna;
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
    ->whereNotNull('cliente_idcliente')
    ->join('zonaEstacionamiento', 'sitio.zonaEstacionamiento_idzonaEstacionamiento', '=', 'zonaEstacionamiento.idzonaEstacionamiento')
    ->join('cliente', 'sitio.cliente_idcliente', '=', 'cliente.idcliente')
    ->join('parqueo', 'zonaEstacionamiento.parqueo_idparqueo', '=', 'parqueo.idparqueo')
    ->select('cliente.idcliente','cliente.nombre_cliente', 'parqueo.nombre_parqueo', 'zonaEstacionamiento.nombre_zona_estacionamiento','sitio.numero')
                ->get();

   return response()->json(json_encode($arreglo));             

   }

   public function listaClienteSinSitio(){
      $arreglo3=DB::table('cliente')
      ->leftJoin('sitio', 'sitio.cliente_idcliente', '=', 'cliente.idcliente')
      ->whereNull('sitio.cliente_idcliente')
      ->select('cliente.idcliente','cliente.nombre_cliente')
                  ->get();
      
    return response()->json(json_encode($arreglo3));
   }


   public function reasignar(Request $request){
      DB::table('sitio')->where('cliente_idcliente',$request->idcliente)->update(['cliente_idcliente'=>null]);
      $sitio = Sitio::find($request->idsitio);
      $sitio->cliente_idcliente = $request->idcliente;
      
      $sitio->save();
   }

   public function asignarManual(Request $request){
      $sitio = Sitio::find($request->idsitio);
      $sitio->cliente_idcliente = $request->idcliente;
      
      $sitio->save();
   }


   public function listaSitios(){

     $arreglo2=DB::table('sitio')
    ->whereNull('cliente_idcliente')
    ->join('zonaEstacionamiento', 'sitio.zonaEstacionamiento_idzonaEstacionamiento', '=', 'zonaEstacionamiento.idzonaEstacionamiento')
    ->join('parqueo', 'zonaEstacionamiento.parqueo_idparqueo', '=', 'parqueo.idparqueo')
    ->select('idsitio','parqueo.nombre_parqueo', 'zonaEstacionamiento.nombre_zona_estacionamiento','sitio.numero')
                ->get();

   return response()->json(json_encode($arreglo2));    
   }

   public function obtenerMiSitio(Request $request){
      $idclient = $request -> idCliente;
      $arreglo=DB::table('sitio')
      ->where('cliente_idcliente',$idclient)
      ->join('zonaEstacionamiento', 'sitio.zonaEstacionamiento_idzonaEstacionamiento', '=', 'zonaEstacionamiento.idzonaEstacionamiento')
      ->join('parqueo', 'zonaEstacionamiento.parqueo_idparqueo', '=', 'parqueo.idparqueo')
      ->select('parqueo.nombre_parqueo', 'zonaEstacionamiento.nombre_zona_estacionamiento','sitio.numero')
                ->get();
  
      return response()->json(json_encode($arreglo));    
    }

    public function dejarSinSitio(Request $request){
      DB::table('sitio')->where('cliente_idcliente',$request->idcliente)->update(['cliente_idcliente'=>null]);
      return response()->json(json_encode('Se ha dejado sin sitio al usuario'));
    }

}