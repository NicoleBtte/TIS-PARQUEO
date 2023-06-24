<?php

namespace App\Http\Controllers;

use App\Models\Parqueo;
use App\Models\Sitio;
use App\Models\Operador;
use App\Models\ZonaDeEstacionamiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ZonaDeEstacionamientoController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Time;


class ParqueoController extends Controller
{
    public function index()
    {
        $parqueos = Parqueo::all();
        if( $parqueos->isEmpty()){
            return response()->json(['message' => 'No se encontraron parqueos.'], 404);
        } else {
            //return response()->json([$parqueos], 200);
            return response()->json(json_encode($parqueos));
        }
    }

    public function zona($numero_de_zonas,$parqueo_idParqueo){
        $zona = new ZonaDeEstacionamientoController;
        $zona->registroZonas($parqueo_idParqueo, $numero_de_zonas);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre_parqueo' => ['required', 'unique:parqueo', 'string', 'min:5', 'max:16'],
            'numero_de_zonas' => ['required', 'integer', 'min:0'],
            'mapa_parqueo' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2000'],
        ]);

        $mapa = $request->file('mapa_parqueo');
        $nombreArchivo = time() . '_' . $mapa->getClientOriginalName();
        $path = $mapa->storeAs('public/mapasparqueo', $nombreArchivo);

        $parqueo = new Parqueo();
        $parqueo->nombre_parqueo = $validatedData['nombre_parqueo'];
        $parqueo->numero_de_zonas = $validatedData['numero_de_zonas'];
        $numZonas= $request ->numero_de_zonas;
        $parqueo->mapa_parqueo = time() . '_' . $mapa->getClientOriginalName();

        try {
            $parqueo->save();
            $this->zona($numZonas,DB::table('parqueo')->latest('idParqueo')->first()->idParqueo);
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
            return response()->json([$parqueo], 200);
        } else {
            return response()->json(['error' => 'No se encontró el parqueo'], 404);
        }
    }

    public function update(Request $request, $idParqueo)
    {
        $parqueo = Parqueo::findOrFail($idParqueo);
        $numeroActualZonas = $parqueo->numero_de_zonas;
        $validatedData = $request->validate([
            'nombre_parqueo' => ['required', 'string', 'min:5', 'max:16'],
            'numero_de_zonas' => ['required', 'integer', 'min:0'],
            'mapa_parqueo' => ['nullable', 'string']
        ]);

        $parqueo->nombre_parqueo = $validatedData['nombre_parqueo'];
        $parqueo->numero_de_zonas = $validatedData['numero_de_zonas'];
        $numZonas= $request ->numero_de_zonas;

        $zona = new ZonaDeEstacionamientoController;
        $zonaEliminar = new ZonaDeEstacionamiento();
        if ($numeroActualZonas > $numZonas) {
            while ($numeroActualZonas > $numZonas){
                $zonaEliminar = ZonaDeEstacionamiento::where('parqueo_idparqueo', $idParqueo)
                ->where('nombre_zona_estacionamiento', 'zona '.$numeroActualZonas)
                ->get();
                if ($zonaEliminar) {
                    $zona->destroy($zonaEliminar[0]->idzonaEstacionamiento);
                }
                $numeroActualZonas--;
            } 
        }else{
            $this->zona($numZonas,$idParqueo);
        }
        
        if($parqueo!== null) {
            $parqueo->save();
            return response()->json(['message' => 'Parqueo actualizado correctamente.']);
        } else {
            return response()->json(['message' => 'No se encontró el parqueo a actualizar.'], 404);
        }
    }

    public function destroy($idParqueo)
    {
        $zonasIdsA = ZonaDeEstacionamiento::where('parqueo_idparqueo', $idParqueo)->pluck('idzonaEstacionamiento')->toArray();
        foreach ($zonasIdsA as $idZona){
            $sitios = Sitio::where('zonaEstacionamiento_idzonaEstacionamiento', $idZona)->get();
            foreach ($sitios as $sitio){
                if($sitio->cliente_idcliente != null){
                    return response()->json(['message' => 'No se puede eliminar el parqueo porque algunos sitios están asignados a clientes.']);
                }
            }
        }
        $operador = Operador::where('parqueo_idparqueo', $idParqueo)->first();
        if($operador){
            $operador->parqueo_idparqueo = null;
            $operador->save();
        }
        $parqueo = Parqueo::find($idParqueo);
        if($parqueo) {
            $zonaIds = ZonaDeEstacionamiento::where('parqueo_idparqueo', $idParqueo)->pluck('idzonaEstacionamiento')->toArray();
            foreach ($zonaIds as $zonaId) {
                DB::delete('DELETE FROM sitio WHERE zonaEstacionamiento_idzonaEstacionamiento = ?', [$zonaId]);
            }
            DB::delete('DELETE FROM zonaestacionamiento WHERE parqueo_idparqueo = ?', [$idParqueo]);
            $parqueo = Parqueo::destroy($idParqueo);
            return response()->json(['message' => 'Parqueo eliminado correctamente.']);
        } else {
            return response()->json(['message' => 'No se encontró el parqueo a eliminar.'], 404);
        }
    }

    public function verImagen(Request $request){
        $id = $request->idPaqueo;
        $parqueo = Parqueo::findOrFail($id);
        $file_path = storage_path('app/public/mapasparqueo/' . $parqueo->mapa_parqueo);
        if (!File::exists($file_path)) {
            abort(404);
        }
        $url = asset('storage/app/public/mapasparqueo/' . $parqueo->mapa_parqueo);
        return response()->json(['url' => $url]);
    }
}
