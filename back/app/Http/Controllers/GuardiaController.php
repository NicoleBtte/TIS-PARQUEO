<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guardia;
use App\Models\Turno;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class GuardiaController extends Controller
{
    public function login(Request $request)
    {
        $credentials = [
            'pass_guardia' => $request->password,
            'idguardia' => $request->ci,
        ];

        $user = Guardia::where('idguardia', '=', $request->ci)->first();

        if ($user && Hash::check($request->password, $user->pass_guardia)) {
            auth()->login($user);

            $token = $user->createToken('access_token')->plainTextToken;

            return response()->json([
                'status' => 1,
                'message' => 'login correcto',
                'access_token' => $token,
                'rol' => 'guardia',
                'idusuario' => $user->idguardia // agrega esta línea
            ]);            
        } else {
            return response()->json([
                'status' => 0,
                'message' => 'login Incorrecto',
            ]);
        }
    }

    public function logout()
    {
        $user = auth()->user();
        if (!$user instanceof Guardia) {
            return response()->json([
                "status" => 0,
                "msg" => "Usuario no encontrado"
            ], 404);
        }

        $user->tokens()->delete();
        return response()->json([
            "status" => 1,
            "msg" => "cierre sesion"
        ]);
    }

    public function showAll(){
        $consultaguardia = Guardia::all();
        return response()->json($consultaguardia);
    }

    public function show(Request $request){
        $consultaOperador=Guardia::find($request->carnet);
        return response()->json(json_encode($consultaOperador));
    }

    public function eliminarGuardia(Request $request){
        $guardiaId = $request->id; // ID del guardia que deseas eliminar

        // Verificar si existen relaciones en la tabla turno_has_guardia
        if (Turno::whereHas('guardias', function ($query) use ($guardiaId) {
            $query->where('guardia_idguardia', $guardiaId);
        })->exists()) {
            $turnos = Turno::whereHas('guardias', function ($query) use ($guardiaId) {
                $query->where('guardia_idguardia', $guardiaId);
            })->get();
            
            foreach ($turnos as $turno) {
                $turno->guardias()->detach($guardiaId);
            }
            Guardia::destroy($guardiaId);
        } else {
            $registro=Guardia::find($request->id);
                $registro->delete();
        }
        return response()->json(['message' => 'Usuario eliminado con éxito']);
    }

    public function crear(Request $request){

        $validator = Validator::make($request->all(), [
            'ci' => 'required|unique:guardia,idguardia',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson());
        }
        

        $registro=new Guardia;
        $registro->idguardia=$request->ci;
        $registro->nombre_guardia=$request->nombre_guardia;
        $registro->telefono_guardia=$request->telf_guardia;
        $registro->pass_guardia=Hash::make($request->pass_guardia);
        $registro->save();

        return response()->json(['message' => 'Usuario creado con éxito']);
    }

    public function actualizarDatosGuardia(Request $request){
        if($request->ci != $request->idguardia){
            $validator = Validator::make($request->all(), [
                'ci' => 'required|unique:guardia,idguardia',
            ]);
        
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson());
            }
        }
        $registro = Guardia::findOrFail($request->idguardia);
        $registro->idguardia=$request->ci;
        $registro->nombre_guardia=$request->nombre_guardia;
        $registro->telefono_guardia=$request->telf_guardia;
        $registro->save();
        return response()->json(['message' => 'Se a actualizado sus datos correctamente']);
    }
}
