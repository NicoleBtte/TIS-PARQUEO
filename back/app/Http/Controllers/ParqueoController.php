<?php

namespace App\Http\Controllers;

use App\Models\Parqueo;
use Illuminate\Http\Request;

class ParqueoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $parqueos = Parqueo::all();
        return $parqueos;
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
        $parqueo = new Parqueo();
        $parqueo->nombreParqueo = $request->nombreParqueo;
        $parqueo->numero_de_zonas = $request->numero_de_zonas;
        $parqueo->mapaParqueo = $request->mapaParqueo;

        $parqueo->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Parqueo  $parqueo
     * @return \Illuminate\Http\Response
     */
    public function show($idParqueo)
    {
        $parqueo = Parqueo::find($idParqueo);
        return $parqueo;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Parqueo  $parqueo
     * @return \Illuminate\Http\Response
     */
    public function edit(Parqueo $parqueo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Parqueo  $parqueo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $idParqueo)
    {
        $parqueo = Parqueo::findOrFail($request->$idParqueo);
        $parqueo->nombreParqueo = $request->nombreParqueo;
        $parqueo->numero_de_zonas = $request->numero_de_zonas;
        $parqueo->mapaParqueo = $request->mapaParqueo;

        $parqueo->save();
        return $parqueo;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Parqueo  $parqueo
     * @return \Illuminate\Http\Response
     */
    public function destroy($idParqueo)
    {
        $parqueo = Parqueo::destroy($idParqueo);
        return $parqueo;
    }
}
