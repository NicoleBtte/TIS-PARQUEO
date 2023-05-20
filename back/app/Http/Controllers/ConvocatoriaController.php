<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Time;
use Illuminate\Http\UploadedFile;

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
            'titulo' => ['required', 'string', 'min:5', 'max:32', 'unique:convocatoria'],
            'descripcion_convocatoria' => ['required', 'string'],
            'numero_cupos' => ['required', 'integer', 'min:0'],
            'estado_convocatoria' => ['required', 'integer', 'min:0', 'max:1'],
            'fecha_inicio' => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:fecha_fin'],
            'fecha_fin' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:fecha_inicio'],
            'fecha_pago' => ['required', 'integer', 'min:1', 'max:28'],
            'pago_mensual'=>['required', 'integer', 'min:0', 'max:1000'],
            'multa_mensual'=>['required', 'integer', 'min:0', 'max:1000'],
            'pdf_convocatoria' => ['required', 'file', 'mimes:pdf', 'max:2000'],
            'fecha_inicio_gestion'=>['required', 'date', 'date_format:Y-m-d', 'before_or_equal:fecha_fin_gestion'],
            'fecha_fin_gestion'=>['required', 'date', 'date_format:Y-m-d', 'before_or_equal:fecha_inicio_gestion'],
        ]);

        $ultimaConvocatoria = Convocatoria::orderBy('fecha_fin', 'desc')->first();
        if ($ultimaConvocatoria && $validatedData['fecha_inicio'] <= $ultimaConvocatoria->fecha_fin) {
            return response()->json([
                'success' => false,
                'message' => 'La fecha de inicio de la nueva convocatoria debe ser mayor que la fecha de fin de la última convocatoria registrada.'
            ]);
        }

        $pdf = $request->file('pdf_convocatoria');
        $nombreArchivo = time() . '_' . $pdf->getClientOriginalName();
        $path = $pdf->storeAs('public/pdfsconvocatoria', $nombreArchivo);

        $convocatoria = new Convocatoria();
        $convocatoria->titulo = $validatedData['titulo'];
        $convocatoria->descripcion_convocatoria = $validatedData['descripcion_convocatoria'];
        $convocatoria->numero_cupos = $validatedData['numero_cupos'];
        $convocatoria->estado_convocatoria = $validatedData['estado_convocatoria'];
        $convocatoria->fecha_inicio = $validatedData['fecha_inicio'];
        $convocatoria->fecha_fin = $validatedData['fecha_fin'];
        $convocatoria->fecha_pago = $validatedData['fecha_pago'];
        $convocatoria->pago_mensual = $validatedData['pago_mensual'];
        $convocatoria->multa_mensual = $validatedData['multa_mensual'];
        $convocatoria->pdf_convocatoria = time() . '_' . $pdf->getClientOriginalName();
        $convocatoria->fecha_inicio_gestion = $validatedData['fecha_inicio_gestion'];
        $convocatoria->fecha_fin_gestion = $validatedData['fecha_fin_gestion'];
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
            'titulo' => ['required', 'string', 'min:5', 'max:32'],
            'descripcion_convocatoria' => ['required', 'string', 'min:5', 'max:255'],
            'numero_cupos' => ['required', 'integer', 'min:0'],
            'estado_convocatoria' => ['required', 'integer', 'min:0', 'max:1'],
            'fecha_inicio' => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:fecha_fin'],
            'fecha_fin' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:fecha_inicio'],
            'fecha_pago' => ['required', 'integer', 'min:1', 'max:28'],
            'pago_mensual'=>['required', 'integer', 'min:0', 'max:1000'],
            'multa_mensual'=>['required', 'integer', 'min:0', 'max:1000'],
            'fecha_inicio_gestion'=>['required', 'date', 'date_format:Y-m-d', 'before_or_equal:fecha_fin_gestion'],
            'fecha_fin_gestion'=>['required', 'date', 'date_format:Y-m-d', 'before_or_equal:fecha_inicio_gestion'],
        ]);
        $convocatoria->titulo = $validatedData['titulo'];
        $convocatoria->descripcion_convocatoria = $validatedData['descripcion_convocatoria'];
        $convocatoria->numero_cupos = $validatedData['numero_cupos'];
        $convocatoria->estado_convocatoria = $validatedData['estado_convocatoria'];
        $convocatoria->fecha_inicio = $validatedData['fecha_inicio'];
        $convocatoria->fecha_fin = $validatedData['fecha_fin'];
        $convocatoria->fecha_pago = $validatedData['fecha_pago'];
        $convocatoria->pago_mensual = $validatedData['pago_mensual'];
        $convocatoria->multa_mensual = $validatedData['multa_mensual'];
        $convocatoria->fecha_inicio_gestion = $validatedData['fecha_inicio_gestion'];
        $convocatoria->fecha_fin_gestion = $validatedData['fecha_fin_gestion'];

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

     public function descargarPdfconvocatoria(Request $request){
        $id = $request->idConvocatoria;
        $convocatoria = Convocatoria::findOrFail($id);
        $file_path = storage_path('app\\public\\pdfsconvocatoria\\'.$convocatoria->pdf_convocatoria);
        return response()->download($file_path, $convocatoria->pdf_convocatoria, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment']);
        }
    }