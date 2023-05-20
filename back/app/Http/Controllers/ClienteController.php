<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Http\Controllers\SitioController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class ClienteController extends Controller
{
    //
    public static function registrarPlaca(Request $request){
        DB::table('auto')->insert([
            'placa_auto' => $request->placa,
            'cliente_idcliente' => $request->ci,
        ]);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'ci' => 'required|unique:cliente,idcliente',
            /*'emailcliente' => 'required|unique:cliente,email_cliente'*/
        ]);

        /*$validator->setCustomMessages([
            'required' => 'El campo :attribute es obligatorio.',
            'unique' => 'El :attribute ":input" ya existe en la base de datos.',
        ]);*/
    
        if ($validator->fails()) {
            //return redirect('fallido')
            /*return response()
                ->withErrors($validator)
                ->with('errors_json', $validator->errors()->toJson())
                ->withInput();*/
                return response()->json($validator->errors()->toJson());
        }
        

        $registro=new Cliente;
        $registro->idcliente=$request->ci;
        $registro->nombre_cliente=$request->name;
        $registro->estado_pago=0;
        $registro->monto_a_pagar=DB::table('convocatoria')->orderBy('idConvocatoria', 'desc')->first()->pago_mensual;
        $registro->multa=0;//DB::table('convocatoria')->orderBy('id', 'desc')->first()->multa_mensual;
        $registro->saldo=1200;//DB::table('convocatoria')->orderBy('id', 'desc')->first()->pagoTotal;
        $registro->fecha_pagado=null;
        $registro->fecha_lim_pago=DB::table('convocatoria')->orderBy('idConvocatoria', 'desc')->first()->fecha_pago;
        //$age = DB::table('users')->select('age')->latest('id')->value('age');
        
        $registro->telf_cliente=$request->telefono;
        $registro->email_cliente=$request->email;
        $registro->password=Hash::make($request->password);
        $registro->apellidos_cliente=$request->apellidos;
        $registro->direccion_cliente=$request->direccion;
        $registro->unidad_trabajo=null;//$request->unidad;
        $registro->cargo_cliente=null;//$request->cargo;
        
        $registro->save();
        
        $sitioAsignado=SitioController::asignarSitio($request->ci);

        $this->registrarPlaca($request);

        //Auth::login($registro);

        //return redirect()->route('logrado')->with('Genial!','Se guardaron con exito');
        return response()->json(['message' => "Usuario creado con éxito con {$sitioAsignado}"]);
    }

    public function index(){
        $registro=Cliente::select('nombre_cliente','idcliente')->get();
        return response()->json($registro);
        //return view('clientes',compact('registro'));
    }

    public function show(Request $request){
        $estado=Cliente::find($request->carnet);

        return response()->json($estado);
    }

    public function update(Request $request, $id){
        $registro=Cliente::find($id);
        $registro->idcliente=$request->ci;
        $registro->nombre_cliente=$request->name;
        $registro->estado_pago=$request->estado;
        $registro->monto_a_pagar=0;
        $registro->fecha_pagado=$request->fechapagado;
        $registro->fecha_lim_pago=DB::table('convocatoria')->orderBy('id', 'desc')->first()->fecha_pago;
        //$age = DB::table('users')->select('age')->latest('id')->value('age');
        
        $registro->telf_cliente=$request->telfcliente;
        $registro->email_cliente=$request->emailcliente;
        $registro->password=$request->passwordcliente;
        $registro->apellidos_cliente=$request->apellidoscliente;
        $registro->direccion_cliente=$request->direccioncliente;
        $registro->unidad_trabajo=$request->unidadtrabajo;
        $registro->cargo_cliente=$request->cargocliente;
        $registro->save();

        return redirect()->route('clienteid');
    }

    public function destroy($id){
        $registro=Cliente::find($id);
        $registro->delete();

        return response()->json(['message' => 'Usuario eliminado con éxito']);
    }

    public function login(Request $request)
    {
        $credentials = [
            'password' => $request->password,
            'idcliente' => $request->ci,
        ];

        $user = Cliente::where('idcliente', '=', $request->ci)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            auth()->login($user);

            $token = $user->createToken('access_token')->plainTextToken;

            return response()->json([
                'status' => 1,
                'message' => 'login correcto',
                'access_token' => $token,
                'rol' => 'cliente',
                'idusuario' => $user->idcliente // agrega esta línea
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
        if (!$user instanceof Cliente) {
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
