<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;

class ConvocatoriaController extends Controller
{
    public function index()
    {
        $convocatorias = Convocatoria::all();
        if( $convocatorias->isEmpty()){
            return response()->json(['message' => 'No se encontraron convocatorias'], 404);
        } else {
            return response()->json(['data' =>  $convocatorias], 200);
        }
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titulo' => ['required', 'string', 'min:5', 'max:16', 'unique:convocatorias'],
            'descripcionConv' => ['required', 'string'],
            'numeroDeZonas' => ['required', 'integer', 'min:0'],
            'estado' => ['required', 'integer', 'min:0', 'max:1'],
            'fecha_actual' => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:fecha_fin'],
            'fecha_fin' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:fecha_actual'],
        ]);

        $convocatoria = new Convocatoria();
        $convocatoria->titulo = $validatedData['titulo'];
        $convocatoria->descripcionConv = $validatedData['descripcionConv'];
        $convocatoria->numeroDeZonas = $validatedData['numeroDeZonas'];
        $convocatoria->estado = $validatedData['estado'];
        $convocatoria->fecha_actual = $validatedData['fecha_actual'];
        $convocatoria->fecha_fin = $validatedData['fecha_fin'];

        try {
            $convocatoria->save();
            return response()->json([
                'success' => true,
                'message' => 'Convocatoria creada con éxito',
                'data' => $convocatoria->toArray()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear la convocatoria',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show($idConvocatoria)
    {
        $convocatoria = Convocatoria::find($idConvocatoria);
        if ($convocatoria) {
            return response()->json(['data' =>$convocatoria], 200);
        } else {
            return response()->json(['error' => 'No se encontró la convocatoria'], 404);
        }
    }
    public function update(Request $request, $idConvocatoria)
    {

        $convocatoria = Convocatoria::findOrFail($idConvocatoria);

        $validatedData = $request->validate([
            'titulo' => ['required', 'string', 'min:5', 'max:16', 'unique:convocatorias'],
            'descripcionConv' => ['required', 'string'],
            'numeroDeZonas' => ['required', 'integer', 'min:0'],
            'estado' => ['required', 'integer', 'min:0', 'max:1'],
            'fecha_actual' => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:fecha_fin'],
            'fecha_fin' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:fecha_actual'],
        ]);
        $convocatoria->titulo = $validatedData['titulo'];
        $convocatoria->descripcionConv = $validatedData['descripcionConv'];
        $convocatoria->numeroDeZonas = $validatedData['numeroDeZonas'];
        $convocatoria->estado = $validatedData['estado'];
        $convocatoria->fecha_actual = $validatedData['fecha_actual'];
        $convocatoria->fecha_fin = $validatedData['fecha_fin'];

        if($convocatoria) {
            $convocatoria->save();
            return response()->json(['message' => 'Convocatoria actualizada correctamente.']);
        } else {
            return response()->json(['message' => 'No se encontró la convocatoria a actualizar.'], 404);
        }
    }
    public function destroy($idConvocatoria)
    {
        $convocatoria = Convocatoria::find($idConvocatoria);
        if($convocatoria) {
            $convocatoria = Convocatoria::destroy($idConvocatoria);
            return response()->json(['message' => 'Convocatoria eliminada correctamente.']);
        } else {
            return response()->json(['message' => 'No se encontró la convocatoria a eliminar.'], 404);
        }
    }
}
