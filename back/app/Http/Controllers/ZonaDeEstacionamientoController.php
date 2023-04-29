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

<<<<<<< HEAD
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function sitios($numSitios){
        $idZona= DB::table('ZonaEstacionamiento')->latest('idzonaEstacionamiento')->first()->idzonaEstacionamiento;
        $sitio= new SitioController;
        $sitio->registroSitios($idZona, $numSitios);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
=======
>>>>>>> cbc17c1d0c28ca5dc520248cd564bf306085065d
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
<<<<<<< HEAD
        $zonaDeEstacionamiento->nombreZona = $request->nombreZona;
        $zonaDeEstacionamiento->techo =0;$request->techo;
        $zonaDeEstacionamiento->arbol =0;// $request->arbol;
        $zonaDeEstacionamiento->tipoPiso = $request->tipoPiso;
        $zonaDeEstacionamiento->numero_de_sitios = $request->numero_de_sitios;
        $numSitios= $request->numero_de_sitios;
        $zonaDeEstacionamiento->descripcionZona = $request->descripcionZona;
        $zonaDeEstacionamiento->save();

       sitios($numSitios);
    }

    

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ZonaDeEstacionamiento  $zonaDeEstacionamiento
     * @return \Illuminate\Http\Response
     */
    public function show(ZonaDeEstacionamiento $zonaDeEstacionamiento)
=======
        $zonaDeEstacionamiento->nombreZona = $validatedData['nombreZona'];
        $zonaDeEstacionamiento->techo = $validatedData['techo'];
        $zonaDeEstacionamiento->arbol = $validatedData['arbol'];
        $zonaDeEstacionamiento->tipoPiso = $validatedData['tipoPiso'];
        $zonaDeEstacionamiento->numero_de_sitios = $validatedData['numero_de_sitios'];
        $zonaDeEstacionamiento->descripcionZona = $validatedData['descripcionZona'];

        $zonaDeEstacionamiento->save();
    }

    public function show($idZonaEstacionamiento)
>>>>>>> cbc17c1d0c28ca5dc520248cd564bf306085065d
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
