<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guardia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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

    public function eliminarGuardia(Request $request){
        $registro=Guardia::find($request->id);
        $registro->delete();

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
}
