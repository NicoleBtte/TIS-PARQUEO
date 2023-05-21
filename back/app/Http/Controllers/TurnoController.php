<?php

namespace App\Http\Controllers;

use App\Models\Turno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TurnoController extends Controller
{
   public function registroTurnos(Request $request) {
        $turno = new Turno();
        $turno->dia_turno=$request ->dias;
        $turno->hora_inicio_turno=$request -> horaini;
        $turno->hora_fin_turno=$request -> horafin;
        $turno->nombre_turno=$request ->nombret;

        $turno->save();
        
        
    }

   

public function asignarTurno(Request $request){
      $turno = Turno::find($request->idturno);
      $turno->guardia_idguardia = $request->idguardia;
      
      $turno->save();
   }
 

   public function listaGuardias(){
    /**
     * nombre, paqueo, zona, sitio
    */
    $arregloguardias=DB::table('turno')
    ->whereNotNull('guardia_idguardia')
    ->join('guardia', 'turno.guardia_idguardia', '=', 'guardia.idguardia')
    ->select('guardia.idguardia','guardia.nombre_guardia', 'turno.nombre_turno', 'turno.dia_turno','turno.hora_inicio_turno', 'turno.hora_fin_turno')
                ->get();

   return response()->json(json_encode($arregloguardias));             

   }

   public function listaGuardiasSinTurno(){
      $arregloguardiassin=DB::table('guardia')
      ->leftJoin('turno', 'turno.guardia_idguardia', '=', 'guardia.idguardia')
      ->whereNull('turno.guardia_idguardia')
      ->select('guardia.idguardia','guardia.nombre_guardia')
                  ->get();
      
    return response()->json(json_encode($arregloguardiassin));
   }


   public function reasignarTurno(Request $request){
      DB::table('turno')->where('guardia_idguardia',$request->idguardia)->update(['guardia_idguardia'=>null]);
      $turno = Turno::find($request->idturno);
      $turno->guardia_idguardia = $request->idguardia;
      
      $turno->save();
   }

   public function actualizarTurno(Request $request){
        
    $turno = DB::table('turno')->where('idturno', $request-> idturno)->first();

    
    if ($turno->nombre_turno != $request-> nombret) {
        DB::table('turno')->where('idturno', $request-> idturno)->update(['nombre_turno' => $request-> nombret]);
    }
    if ($turno->hora_inicio_turno != $request-> horaini) {
        DB::table('turno')->where('idturno', $request-> idturno)->update(['hora_inicio_turno' => $request-> horaini]);
    }
    if ($turno->hora_fin_turno != $request-> horafin) {
        DB::table('turno')->where('idturno', $request-> idturno)->update(['hora_fin_turno' => $request-> horafin]);
    }
    if ($turno->dia_turno != $request-> diastur) {
        DB::table('turno')->where('idturno', $request-> idturno)->update(['dia_turno' => $request-> diastur]);
    }
        

    }


   public function listaTurnosTodos(){

        $arreglotodost=DB::table('turno')
        ->select('idturno','nombre_turno','hora_inicio_turno', 'hora_fin_turno','dia_turno')
                ->get();

        return response()->json(json_encode($arreglotodost));    
   }
   
   public function eliminarTurno(Request $request){
        DB::table('turno')->where('idturno', $request ->idturno)->delete();
   }   

    public function listaTurnosSinGuardia(){

        $arregloturnosin=DB::table('turno')
        ->whereNull('guardia_idguardia')
        ->select('idturno','nombre_turno','hora_inicio_turno', 'hora_fin_turno','dia_turno')
                    ->get();
    
        return response()->json(json_encode($arregloturnosin));    
      }

    public function dejarSinTurno(Request $request){
      DB::table('turno')->where('guardia_idguardia',$request->idguardia)->update(['guardia_idguardia'=>null]);
      return response()->json(json_encode('Se ha dejado sin turno al guardia'));
    }

    public function listaTurnosDelGuardia(Request $request){
        $idg = $request -> idguardia;
        $arregloturnosin=DB::table('turno')
        ->where('guardia_idguardia',$idg)
        ->select('idturno','nombre_turno','hora_inicio_turno', 'hora_fin_turno','dia_turno')
                    ->get();
    
        return response()->json(json_encode($arregloturnosin));    
      }

}