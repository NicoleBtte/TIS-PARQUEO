<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ConvocatoriaController extends Controller
{
    public function index()
    {
        $convocatorias = Convocatoria::all();
        if( $convocatorias->isEmpty()){
            return response()->json(['message' => 'No se encontraron convocatorias'], 404);
        } else {
            return response()->json([$convocatorias], 200);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titulo' => ['required', 'string', 'min:5', 'max:16', 'unique:convocatoria'],
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
        if($convocatoria){
            $convocatoria->save();
            return response()->json([
                'success' => true,
                'message' => 'Convocatoria creada con éxito',
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Error al crear la convocatoria',
            ]);
        }
    }

    public function show($idConvocatoria)
    {
        $convocatoria = Convocatoria::find($idConvocatoria);
        if ($convocatoria) {
            return response()->json([$convocatoria], 200);
        } else {
            return response()->json(['error' => 'No se encontró la convocatoria'], 404);
        }
    }
    public function update(Request $request, $idConvocatoria)
    {

        $convocatoria = Convocatoria::findOrFail($idConvocatoria);

        $validatedData = $request->validate([
            'titulo' => ['required', 'string', 'min:5', 'max:16'],
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

    public function registrarseConvo()
    {
        $convocatoria = Convocatoria::where('estado_convocatoria', '=', 1)->first();
        if ($convocatoria->numero_cupos > 0) {
            $convocatoria->numero_cupos = $convocatoria->numero_cupos - 1;
            if($convocatoria->numero_cupos == 0){
                $convocatoria->estado_convocatoria = 0;
            }
            $convocatoria->save();
            return response()->json(json_encode([
                'success' => true,
                'message' => 'Se resto un cupo del total',
            ]));
        } else {
            return response()->json(json_encode([
                'success' => false,
                'message' => 'No hay cupos disponibles'
            ]));
        }
    }

     public function consultarConvocatoriaActiva(){
        $convocatoria = DB::table('convocatoria')
            ->where('convocatoria.estado_convocatoria', '=', 1)
            ->select('convocatoria.*')
            ->first();
        if ($convocatoria) {
            return response()->json(json_encode($convocatoria));
        } else {
            return response()->json(json_encode(null));
        }
     }
}
