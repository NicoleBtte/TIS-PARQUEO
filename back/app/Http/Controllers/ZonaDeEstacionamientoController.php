<?php

namespace App\Http\Controllers;

use App\Models\ZonaDeEstacionamiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\SitioController;

class ZonaDeEstacionamientoController extends Controller
{
    public function index()
    {
        $zonaDeEstacionamientos = ZonaDeEstacionamiento::all();
        if($zonaDeEstacionamientos->isEmpty()){
            return response()->json(['message' => 'No hay zonas de estacionamiento registradas.'], 404);
        } else {
            return response()->json([$zonaDeEstacionamientos], 200);
        }
    }
    public function sitios($numSitios){
        $idZona= DB::table('zonaEstacionamiento')->latest('idzonaEstacionamiento')->first()->idzonaEstacionamiento;
        $sitio= new SitioController;
        $sitio->registroSitios($idZona, $numSitios);

    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre_zona_estacionamiento' => ['required', 'unique:zonaEstacionamiento', 'string', 'min:5', 'max:16'],
            'techo' => ['nullable', 'boolean'],
            'arboles_cerca' => ['nullable', 'boolean'],
            'tipo_de_piso' => ['nullable', 'string'],
            'numero_de_sitios' => ['required', 'integer', 'min:0'],
            'descripcion' => ['nullable', 'string']
        ]);

        $zonaDeEstacionamiento = new ZonaDeEstacionamiento();

        $zonaDeEstacionamiento->nombre_zona_estacionamiento= $request->nombre_zona_estacionamiento;
        $zonaDeEstacionamiento->parqueo_idparqueo=$request->parqueo_idparqueo;
        $zonaDeEstacionamiento->techo =0;$request->techo;
        $zonaDeEstacionamiento->arboles_cerca =0;// $request->arbol;
        $zonaDeEstacionamiento->tipo_de_piso = $request->tipoPiso;
        $zonaDeEstacionamiento->numero_de_sitios = $request->numero_de_sitios;
        $numSitios= $request->numero_de_sitios;
        $zonaDeEstacionamiento->descripcion = $request->descripcionZona;
        //$zonaDeEstacionamiento->save();
        try {
            $zonaDeEstacionamiento->save();
            $this->sitios($numSitios);
            return response()->json([
                'success' => true,
                'message' => 'Zona de estacionamiento creada con éxito',
                'data' => $zonaDeEstacionamiento->toArray()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear la zona de estacionamiento',
                'error' => $e->getMessage()
            ]);
        }

       //$this->sitios($numSitios);
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
        $zonaDeEstacionamiento->techo = $validatedData['techo'];
        $zonaDeEstacionamiento->arboles_cerca = $validatedData['arboles_cerca'];
        $zonaDeEstacionamiento->tipo_de_piso = $validatedData['tipo_de_piso'];
        $zonaDeEstacionamiento->numero_de_sitios = $validatedData['numero_de_sitios'];
        $zonaDeEstacionamiento->descripcion = $validatedData['descripcion'];

        if($zonaDeEstacionamiento) {
            $zonaDeEstacionamiento->save();
            return response()->json(['message' => 'Zona de estacionamiento actualizada correctamente.']);
        } else {
            return response()->json(['message' => 'No se encontró la zona de estacionamiento a actualizar.'], 404);
        }
    }

    public function destroy($idZonaEstacionamiento)
    {
        $zonaDeEstacionamiento = ZonaDeEstacionamiento::find($idZonaEstacionamiento);
        if ($zonaDeEstacionamiento) {
            $zonaDeEstacionamiento = ZonaDeEstacionamiento::destroy($idZonaEstacionamiento);
            return response()->json(['message' => 'La zona de estacionamiento ha sido eliminada.']);
        } else {
            return response()->json(['message' => 'No se pudo eliminar la zona de estacionamiento.']);
        }
    }
}
