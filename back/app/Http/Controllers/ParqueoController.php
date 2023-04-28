<?php

namespace App\Http\Controllers;

use App\Models\Parqueo;
use Illuminate\Http\Request;

class ParqueoController extends Controller
{
    public function index()
    {
        $parqueos = Parqueo::all();
        return $parqueos;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombreParqueo' => ['required', 'unique:parqueos', 'string', 'min:5', 'max:16'],
            'numero_de_zonas' => ['required', 'integer', 'min:0'],
            'mapaParqueo' => ['nullable', 'string']
        ]);

        $parqueo = new Parqueo();
        $parqueo->nombreParqueo = $validatedData['nombreParqueo'];
        $parqueo->numero_de_zonas = $validatedData['numero_de_zonas'];
        $parqueo->mapaParqueo = $validatedData['mapaParqueo'];

        $parqueo->save();
    }

    public function show($idParqueo)
    {
        $parqueo = Parqueo::find($idParqueo);
        return $parqueo;
    }

    public function update(Request $request, $idParqueo)
    {
        $parqueo = Parqueo::findOrFail($request->$idParqueo);
        
        $validatedData = $request->validate([
            'nombreParqueo' => ['required', 'unique:parqueos', 'string', 'min:5', 'max:16'],
            'numero_de_zonas' => ['required', 'integer', 'min:0'],
            'mapaParqueo' => ['nullable', 'string']
        ]);

        $parqueo->nombreParqueo = $validatedData['nombreParqueo'];
        $parqueo->numero_de_zonas = $validatedData['numero_de_zonas'];
        $parqueo->mapaParqueo = $validatedData['mapaParqueo'];

        $parqueo->save();
        return $parqueo;
    }

    public function destroy($idParqueo)
    {
        $parqueo = Parqueo::destroy($idParqueo);
        return $parqueo;
    }
}
