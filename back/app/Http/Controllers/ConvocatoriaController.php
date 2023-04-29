<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;

class ConvocatoriaController extends Controller
{
    public function index()
    {
        $convocatorias = Convocatoria::all();
        return $convocatorias;
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

        $convocatoria->save();
    }

    public function show($idConvocatoria)
    {
        $convocatoria = Convocatoria::find($idConvocatoria);
        return $convocatoria;
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

        $convocatoria->save();
    }
    public function destroy($idConvocatoria)
    {
        $convocatoria = Convocatoria::destroy($idConvocatoria);
    }
}
