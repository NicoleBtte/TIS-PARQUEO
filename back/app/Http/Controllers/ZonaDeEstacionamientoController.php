<?php

namespace App\Http\Controllers;

use App\Models\ZonaDeEstacionamiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\SitioController;

class ZonaDeEstacionamientoController extends Controller
{
    public function index($idParqueo)
    {
        $zonaDeEstacionamientos = DB::table('zonaestacionamiento')
            ->where('parqueo_idparqueo', $idParqueo)
            ->get();
        //$zonaDeEstacionamientos = ZonaDeEstacionamiento::all();
        if($zonaDeEstacionamientos->isEmpty()){
            return response()->json(['message' => 'No hay zonas de estacionamiento registradas.'], 404);
        } else {
            return response()->json([$zonaDeEstacionamientos], 200);
        }
        }
    public function sitios($numSitios, $id,$i){
        $sitio= new SitioController;
        $sitio->registroSitios($id, $numSitios, $i);
    }
    
    public function registroZonas($id,$numero_de_zonas) {
        $i=1;    
        while($i<=$numero_de_zonas){
            $zonaAux = new ZonaDeEstacionamiento();
            $zonaAux = ZonaDeEstacionamiento::where('parqueo_idparqueo', $id)
            ->where('nombre_zona_estacionamiento', 'zona '.$i)
            ->get();
            if($zonaAux->isEmpty()){
                $zona = new ZonaDeEstacionamiento();
                $zona->nombre_zona_estacionamiento="zona ".$i;
                $zona->parqueo_idparqueo=$id;
                $zona->techo = 0;
                $zona->arboles_cerca = 0;
                $zona->tipo_de_piso = null;
                $zona->numero_de_sitios=0;
                $zona->descripcion=null;
                $zona->save();
                sleep(0.5);
            }
            $i++;
        }
    }

    public function show($idZonaEstacionamiento){
        $zonaDeEstacionamiento = ZonaDeEstacionamiento::find($idZonaEstacionamiento);
        if ($zonaDeEstacionamiento) {
            return response()->json([$zonaDeEstacionamiento], 200);
        } else {
            return response()->json(['error' => 'No se encontró la zona de estacionamiento'], 404);
        }
    }

    public function update(Request $request, $idZonaEstacionamiento)
    {
        $zonaDeEstacionamiento = ZonaDeEstacionamiento::findOrFail($idZonaEstacionamiento);

        $validatedData = $request->validate([
           // 'nombre_zona_estacionamiento' => ['required', 'string', 'min:5', 'max:16'],
            'techo' => ['nullable', 'integer', 'min:0', 'max:1'],
            'arboles_cerca' => ['nullable', 'integer', 'min:0', 'max:1'],
            'tipo_de_piso' => ['nullable', 'string'],
            'numero_de_sitios' => ['nullable', 'integer', 'min:0'],
            'descripcion' => ['nullable', 'string']

        ]);

       // $zonaDeEstacionamiento->nombre_zona_estacionamiento = $validatedData['nombre_zona_estacionamiento'];
       $zonaAnt= ZonaDeEstacionamiento::find($idZonaEstacionamiento);
       $sitiosAnt = $zonaAnt->numero_de_sitios;
        $zonaDeEstacionamiento->techo = $validatedData['techo'];
        $zonaDeEstacionamiento->arboles_cerca = $validatedData['arboles_cerca'];
        $zonaDeEstacionamiento->tipo_de_piso = $validatedData['tipo_de_piso'];
        $zonaDeEstacionamiento->numero_de_sitios = $validatedData['numero_de_sitios'];
        $numSitios= $request->numero_de_sitios;
        $zonaDeEstacionamiento->descripcion = $validatedData['descripcion'];

        if($zonaDeEstacionamiento) {
            $zonaDeEstacionamiento->save();
            if($sitiosAnt!=$numSitios){
                    $i=($numSitios-$sitiosAnt);
                
            }
            else{
                $i=0;
            }
            $this->sitios($numSitios, $idZonaEstacionamiento,$i);
            return response()->json(['message' => 'Zona de estacionamiento actualizada correctamente.']);
        } else {
            return response()->json(['message' => 'No se encontró la zona de estacionamiento a actualizar.'], 404);
        }
    }

    public function destroy($idzonaEstacionamiento)
    {
        $zonaDeEstacionamiento = ZonaDeEstacionamiento::find($idzonaEstacionamiento);
        if ($zonaDeEstacionamiento) {
            DB::delete('DELETE FROM sitio WHERE zonaEstacionamiento_idzonaEstacionamiento = ?', [$idzonaEstacionamiento]);
            ZonaDeEstacionamiento::destroy($idzonaEstacionamiento);
            return response()->json(['message' => 'La zona de estacionamiento ha sido eliminada.']);
        } else {
            return response()->json(['message' => 'No se pudo eliminar la zona de estacionamiento.']);
        }
    }
}
