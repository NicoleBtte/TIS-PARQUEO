<?php

namespace App\Http\Controllers;

use App\Models\ZonaDeEstacionamiento;
use Illuminate\Http\Request;

class ZonaDeEstacionamientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $zonaDeEstacionamientos = ZonaDeEstacionamiento::all();
        return $zonaDeEstacionamientos;
    }

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
    public function store(Request $request)
    {
        $zonaDeEstacionamiento = new ZonaDeEstacionamiento();
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
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ZonaDeEstacionamiento  $zonaDeEstacionamiento
     * @return \Illuminate\Http\Response
     */
    public function edit(ZonaDeEstacionamiento $zonaDeEstacionamiento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ZonaDeEstacionamiento  $zonaDeEstacionamiento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ZonaDeEstacionamiento $zonaDeEstacionamiento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ZonaDeEstacionamiento  $zonaDeEstacionamiento
     * @return \Illuminate\Http\Response
     */
    public function destroy(ZonaDeEstacionamiento $zonaDeEstacionamiento)
    {
        //
    }
}
