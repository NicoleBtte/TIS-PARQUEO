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
        return $zonaDeEstacionamientos;
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
        $zonaDeEstacionamiento->save();

       $this->sitios($numSitios);
    }

    

    public function show($idZonaEstacionamiento){
        $zonaDeEstacionamiento = ZonaDeEstacionamiento::find($idZonaEstacionamiento);
        return $zonaDeEstacionamiento;

        $zonaDeEstacionamiento->save();
    }

    public function update(Request $request, $idZonaEstacionamiento)
    {
        $zonaDeEstacionamiento = ZonaDeEstacionamiento::findOrFail($request->$idZonaEstacionamiento);

        $validatedData = $request->validate([
            'nombreZona' => ['required', 'unique:zonaEstacionamiento', 'string', 'min:5', 'max:16'],
            'techo' => ['nullable', 'boolean'],
            'arbol' => ['nullable', 'boolean'],
            'tipoPiso' => ['nullable', 'string'],
            'numero_de_sitios' => ['required', 'integer', 'min:0'],
            'descripcionZona' => ['nullable', 'string']
        ]);

        $zonaDeEstacionamiento->nombreZona = $validatedData['nombreZona'];
        $zonaDeEstacionamiento->techo = $validatedData['techo'];
        $zonaDeEstacionamiento->arbol = $validatedData['arbol'];
        $zonaDeEstacionamiento->tipoPiso = $validatedData['tipoPiso'];
        $zonaDeEstacionamiento->numero_de_sitios = $validatedData['numero_de_sitios'];
        $zonaDeEstacionamiento->descripcionZona = $validatedData['descripcionZona'];

        $zonaDeEstacionamiento->save();
        return $zonaDeEstacionamiento;
    }

    public function destroy($idZonaEstacionamiento)
    {
        $zonaDeEstacionamiento = ZonaDeEstacionamiento::destroy($idZonaEstacionamiento);
        return $zonaDeEstacionamiento;
    }
}
