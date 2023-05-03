<?php

namespace App\Http\Controllers;

use App\Models\Parqueo;
use Illuminate\Http\Request;

class ParqueoController extends Controller
{
    public function index()
    {
        $parqueos = Parqueo::all();
        if( $parqueos->isEmpty()){
            return response()->json(['message' => 'No se encontraron parqueos.'], 404);
        } else {
            return response()->json(['data' =>  $parqueos], 200);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre_parqueo' => ['required', 'unique:parqueo', 'string', 'min:5', 'max:16'],
            'numero_de_zonas' => ['required', 'integer', 'min:0'],
            'mapa_parqueo' => ['nullable', 'string']
        ]);

        $parqueo = new Parqueo();
        $parqueo->nombre_parqueo = $validatedData['nombre_parqueo'];
        $parqueo->numero_de_zonas = $validatedData['numero_de_zonas'];
        $parqueo->mapa_parqueo = $validatedData['mapa_parqueo'];

        try {
            $parqueo->save();
            return response()->json([
                'success' => true,
                'message' => 'Parqueo creado con éxito',
                'data' => $parqueo->toArray()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear el parqueo',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show($idParqueo)
    {
        $parqueo = Parqueo::find($idParqueo);
        if ($parqueo) {
            return response()->json(['data' =>$parqueo], 200);
        } else {
            return response()->json(['error' => 'No se encontró el parqueo'], 404);
        }
    }

    public function update(Request $request, $idParqueo)
    {
        $parqueo = Parqueo::findOrFail($request->$idParqueo);
        
        $validatedData = $request->validate([
            'nombre_parqueo' => ['required', 'string', 'min:5', 'max:16'],
            'numero_de_zonas' => ['required', 'integer', 'min:0'],
            'mapa_parqueo' => ['nullable', 'string']
        ]);

        $parqueo->nombre_parqueo = $validatedData['nombre_parqueo'];
        $parqueo->numero_de_zonas = $validatedData['numero_de_zonas'];
        $parqueo->mapa_parqueo = $validatedData['mapa_parqueo'];

        if($parqueo) {
            $parqueo->save();
            return response()->json(['message' => 'Parqueo actualizado correctamente.']);
        } else {
            return response()->json(['message' => 'No se encontró el parqueo a actualizar.'], 404);
        }
    }

    public function destroy($idParqueo)
    {
        $parqueo = Parqueo::find($idParqueo);
        if($parqueo) {
            $parqueo = Parqueo::destroy($idParqueo);
            return response()->json(['message' => 'Parqueo eliminado correctamente.']);
        } else {
            return response()->json(['message' => 'No se encontró el parqueo a eliminar.'], 404);
        }
    }
}
