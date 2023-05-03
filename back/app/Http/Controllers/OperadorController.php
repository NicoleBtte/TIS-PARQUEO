<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Operador;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class OperadorController extends Controller
{
    //
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'ci' => 'required|unique:operador,idoperador',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson());
        }
        

        $registro=new Operador;
        $registro->idoperador=$request->idoperador;
        $registro->nombre_operador=$request->nombre_operador;
        $registro->telf_operador=$request->telf_operador;
        $registro->email_operador=$request->email_operador;
        $registro->pass_operador=Hash::make($request->pass_operador);
        $registro->parqueo_idparqueo=$request->parqueo_idparqueo;
        $registro->save();

        return response()->json(['message' => 'Usuario creado con éxito']);
    }

    public function show(Request $request){
        $consultaOperador=Operador::find($request->carnet);
        return response()->json(json_encode($consultaOperador));
    }

    public function destroy($id){
        $registro=Operador::find($id);
        $registro->delete();

        return response()->json(['message' => 'Usuario eliminado con éxito']);
    }


    public function login(Request $request)
    {
        $credentials = [
            'pass_operador' => $request->password,
            'idoperador' => $request->ci,
        ];

        $user = Operador::where('idoperador', '=', $request->ci)->first();

        if ($user && Hash::check($request->password, $user->pass_operador)) {
            auth()->login($user);

            $token = $user->createToken('access_token')->plainTextToken;

            return response()->json([
                'status' => 1,
                'message' => 'login correcto',
                'access_token' => $token,
                'rol' => 'operador',
                'idusuario' => $user->idoperador // agrega esta línea
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
        if (!$user instanceof Operador) {
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
}
