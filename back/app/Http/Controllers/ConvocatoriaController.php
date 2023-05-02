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
            'descripcion_convocatoria' => ['required', 'string'],
            'numero_cupos' => ['required', 'integer', 'min:0'],
            'estado_convocatoria' => ['required', 'integer', 'min:0', 'max:1'],
            'fecha_inicio' => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:fecha_fin'],
            'fecha_fin' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:fecha_inicio'],
            'fecha_pago' => ['required', 'date'],
        ]);

        $convocatoria = new Convocatoria();
        $convocatoria->titulo = $validatedData['titulo'];
        $convocatoria->descripcion_convocatoria = $validatedData['descripcion_convocatoria'];
        $convocatoria->numero_cupos = $validatedData['numero_cupos'];
        $convocatoria->estado_convocatoria = $validatedData['estado_convocatoria'];
        $convocatoria->fecha_inicio = $validatedData['fecha_inicio'];
        $convocatoria->fecha_fin = $validatedData['fecha_fin'];
        $convocatoria->fecha_pago = $validatedData['fecha_pago'];

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
            'descripcion_convocatoria' => ['required', 'string'],
            'numero_cupos' => ['required', 'integer', 'min:0'],
            'estado_convocatoria' => ['required', 'integer', 'min:0', 'max:1'],
            'fecha_inicio' => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:fecha_fin'],
            'fecha_fin' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:fecha_inicio'],
            'fecha_pago' => ['required', 'date'],
        ]);
        $convocatoria->titulo = $validatedData['titulo'];
        $convocatoria->descripcion_convocatoria = $validatedData['descripcion_convocatoria'];
        $convocatoria->numero_cupos = $validatedData['numero_cupos'];
        $convocatoria->estado_convocatoria = $validatedData['estado_convocatoria'];
        $convocatoria->fecha_inicio = $validatedData['fecha_inicio'];
        $convocatoria->fecha_fin = $validatedData['fecha_fin'];
        $convocatoria->fecha_pago = $validatedData['fecha_pago'];

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
    public function registrarseConvo($idConvocatoria)
    {
        $convocatoria = Convocatoria::find($idConvocatoria);
        $convocatoria->numero_cupos = $convocatoria->numero_cupos - 1;
        $convocatoria->save();
    }
}
