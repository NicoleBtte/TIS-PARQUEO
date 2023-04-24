<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;

class ConvocatoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $convocatorias = Convocatoria::all();
        return $convocatorias;
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $convocatoria = new Convocatoria();
        $convocatoria->titulo = $request->titulo;
        $convocatoria->descripcionConv = $request->descripcionConv;
        $convocatoria->numeroDeZonas = $request->numeroDeZonas;
        $convocatoria->estado = $request->estado;
        $convocatoria->fecha_actual = $request->fecha_actual;
        $convocatoria->fecha_fin = $request->fecha_fin;

        $convocatoria->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Convocatoria  $convocatoria
     * @return \Illuminate\Http\Response
     */
    public function show($idConvocatoria)
    {
        $convocatoria = Convocatoria::find($idConvocatoria);
        return $convocatoria;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Convocatoria  $convocatoria
     * @return \Illuminate\Http\Response
     */
    public function edit(Convocatoria $convocatoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Convocatoria  $convocatoria
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $idConvocatoria)
    {
        $convocatoria = Convocatoria::findOrFail($request->$idConvocatoria);
        $convocatoria->titulo = $request->titulo;
        $convocatoria->descripcionConv = $request->descripcionConv;
        $convocatoria->numeroDeZonas = $request->titulo;
        $convocatoria->estado = $request->estado;
        $convocatoria->fecha_actual = $request->fecha_actual;
        $convocatoria->fecha_fin = $request->fecha_fin;

        $convocatoria->save();
        return $convocatoria;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Convocatoria  $convocatoria
     * @return \Illuminate\Http\Response
     */
    public function destroy($idConvocatoria)
    {
        $convocatoria = Convocatoria::destroy($idConvocatoria);
        return $convocatoria;
    }
}
