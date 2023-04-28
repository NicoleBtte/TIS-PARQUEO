<?php

namespace App\Http\Controllers;

use App\Models\ZonaDeEstacionamiento;
use Illuminate\Http\Request;

class ZonaDeEstacionamientoController extends Controller
{
    public function index()
    {
        $zonaDeEstacionamientos = ZonaDeEstacionamiento::all();
        return $zonaDeEstacionamientos;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombreZona' => ['required', 'unique:zonas_de_estacionamiento', 'string', 'min:5', 'max:16'],
            'techo' => ['nullable', 'boolean'],
            'arbol' => ['nullable', 'boolean'],
            'tipoPiso' => ['nullable', 'string'],
            'numero_de_sitios' => ['required', 'integer', 'min:0'],
            'descripcionZona' => ['nullable', 'string']
        ]);

        $zonaDeEstacionamiento = new ZonaDeEstacionamiento();
        $zonaDeEstacionamiento->nombreZona = $validatedData['nombreZona'];
        $zonaDeEstacionamiento->techo = $validatedData['techo'];
        $zonaDeEstacionamiento->arbol = $validatedData['arbol'];
        $zonaDeEstacionamiento->tipoPiso = $validatedData['tipoPiso'];
        $zonaDeEstacionamiento->numero_de_sitios = $validatedData['numero_de_sitios'];
        $zonaDeEstacionamiento->descripcionZona = $validatedData['descripcionZona'];

        $zonaDeEstacionamiento->save();
    }

    public function show($idZonaEstacionamiento)
    {
        $zonaDeEstacionamiento = ZonaDeEstacionamiento::find($idZonaEstacionamiento);
        return $zonaDeEstacionamiento;
    }

    public function update(Request $request, $idZonaEstacionamiento)
    {
        $zonaDeEstacionamiento = ZonaDeEstacionamiento::findOrFail($request->$idZonaEstacionamiento);

        $validatedData = $request->validate([
            'nombreZona' => ['required', 'unique:zonas_de_estacionamiento', 'string', 'min:5', 'max:16'],
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
