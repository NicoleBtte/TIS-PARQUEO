<?php

namespace App\Http\Controllers;

use App\Models\Turno;
use App\Models\Guardia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TurnoController extends Controller
{

    public function listaTurnosDelGuardia(Request $request){
        $idg = $request -> idguardia;
        $arregloturnosin=DB::table('turno')
        ->where('guardia_idguardia',$idg)
        ->select('idturno','nombre_turno','hora_inicio_turno', 'hora_fin_turno','dia_turno')
                    ->get();
    
        return response()->json(json_encode($arregloturnosin));    
      }

      public function registroTurnos(Request $request) {
        $turno = new Turno();
        $turno->dia_turno=$request ->dias;
        $turno->hora_inicio_turno=$request -> horaini;
        $turno->hora_fin_turno=$request -> horafin;
        $turno->nombre_turno=$request ->nombret;

        $turno->save();
        
        
    }

    public function verificar(Request $request){
    
        $idturnoN=$request->idturno;
    
        $turnoNue = Turno::find($idturnoN);
        $dias = explode('-', $turnoNue->dia_turno);
        
        $guardiaId = $request->idguardia;
    
        $coincidencias = DB::table('turno_has_guardia')
        ->join('guardia', 'guardia.idguardia', '=', 'turno_has_guardia.guardia_idguardia')
        ->join('turno', 'turno_has_guardia.turno_idturno', '=', 'turno.idturno')
        ->where('guardia.idguardia', $guardiaId)
        ->select('turno.dia_turno')
        ->get();
        $arregloDiasAsig= [];
        foreach ($coincidencias as $coincidencia) {
            $diaTurno = $coincidencia->dia_turno;
            $diasTurnoAsignado = explode('-', $diaTurno); // Dividir la cadena en un array de días
            $arregloDiasAsig = array_merge($arregloDiasAsig, $diasTurnoAsignado); // Agregar los días al arreglo
        }
         
       
    
             $hayCoincidencia = !empty(array_intersect($arregloDiasAsig, $dias));
    
             if ($hayCoincidencia) {
                $horainiN = $turnoNue->hora_inicio_turno;
                $horafinN = $turnoNue->hora_fin_turno;
    
                $turnosSolapados = 
                    DB::table('turno_has_guardia')
                    ->where('turno_has_guardia.guardia_idguardia', $guardiaId)
                    ->join('turno', 'turno_has_guardia.turno_idturno', '=', 'turno.idturno')
    
                    ->where(function ($query) use ($horainiN,$horafinN ) {
                        $query->whereRaw("TIME_FORMAT(hora_inicio_turno, '%H:%i') <= TIME_FORMAT(?, '%H:%i')", [$horafinN])
                            ->whereRaw("TIME_FORMAT(hora_fin_turno, '%H:%i') >= TIME_FORMAT(?, '%H:%i')", [$horainiN]);
                    })
                    ->get();
    
                if ($turnosSolapados->isNotEmpty()) {
                    $resp='El/Los turno/s solapa con el turno que quiere asignarle al guardia: ';
                    foreach ($turnosSolapados as $turno) {
                        $resp.= $turno->nombre_turno . ", ";
                    }
                    return response()->json(json_encode($resp));
                }
                    else{
                        TurnoController::asignarTurno($guardiaId, $idturnoN);
                        return response()->json(json_encode('Fue asignado exitosamente'));
                    } 

           }
            else{
                TurnoController::asignarTurno($guardiaId, $idturnoN);
                return response()->json(json_encode('El turno fue asignado'));
            }
  
        }
        public function asignarTurno($idguardia, $idturno) {
            $guardia = Guardia::find($idguardia);
            $turno = Turno::find($idturno);
            
            $guardia->turnos()->attach($turno->idturno);
            $guardia->save();
        }
     /////////
    
       public function listaGuardias(){
            /**
             * nombre, paqueo, zona, sitio
            */ 
            $arregloguardias=DB::table('guardia')
            ->leftJoin('turno_has_guardia', 'guardia.idguardia', '=', 'turno_has_guardia.guardia_idguardia')
            ->leftJoin('turno', 'turno_has_guardia.turno_idturno', '=', 'turno.idturno')
            ->select('guardia.idguardia','guardia.nombre_guardia', 'turno.idturno', 'turno.nombre_turno', 'turno.dia_turno','turno.hora_inicio_turno', 'turno.hora_fin_turno')
                        ->get();

            return response()->json(json_encode($arregloguardias));           
    
       }
    
       public function listaGuardiasSinTurno(){
          $arregloguardiassin=DB::table('guardia')
          ->leftJoin('guardia', 'turno_has_guardia.guardia_idguardia', '=', 'guardia.idguardia')
          ->whereNull('turno_has_guardia.turno_idturno')
          ->select('guardia.idguardia','guardia.nombre_guardia')
                      ->get();
          
        return response()->json(json_encode($arregloguardiassin));
       }
     ////////////////////
    
       public function reasignarTurno(Request $request){
          DB::table('turno_has_guardia')
          ->where('guardia_idguardia',$request->idguardia)
          ->where('turno_idturno',$request->idturno)
          ->delete();
          $guardia = Guardia::find($request->idguardia);
          $turno = Turno::find($request ->idturnoN);
            
          $guardia->turnos()->attach($turno->idturnoN);
          $guardia->save();
       }
       ////////////////
    
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
    
            $arregloturnosin=DB::table('turno_has_guardia')
            ->join('turno', 'turno_has_guardia.turno_idturno', '=', 'turno.idturno')
            ->leftJoin('guardia', 'turno_has_guardia.guardia_idguardia', '=', 'guardia.idguardia')
            ->whereNull('turno_has_guardia.guardia_idguardia')
            ->select('idturno','nombre_turno','hora_inicio_turno', 'hora_fin_turno','dia_turno')
                        ->get();
        
            return response()->json(json_encode($arregloturnosin));    
          }
    
        public function dejarSinTurno(Request $request){
            DB::table('turno_has_guardia')
            ->where('turno_idturno',$request->idturno)
            ->where('guardia_idguardia',$request->idguardia)
             ->delete();
            return response()->json(json_encode('Se ha dejado sin turno al guardia'));
        }
    

}