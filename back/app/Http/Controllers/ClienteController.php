<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class ClienteController extends Controller
{
    //
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'carnet' => 'required|unique:cliente,idcliente',
            /*'emailcliente' => 'required|unique:cliente,email_cliente'*/
        ]);

        $validator->setCustomMessages([
            'required' => 'El campo :attribute es obligatorio.',
            'unique' => 'El :attribute ":input" ya existe en la base de datos.',
        ]);
    
        if ($validator->fails()) {
            return redirect('fallido')
                ->withErrors($validator)
                ->with('errors_json', $validator->errors()->toJson())
                ->withInput();
        }
        

        $registro=new Cliente;
        $registro->idcliente=$request->carnet;
        $registro->nombre_cliente='generico';//$request->name;
        $registro->estado_pago=null;
        $registro->monto_a_pagar=null;
        $registro->fecha_pagado=null;
        $registro->fecha_lim_pago=null;//DB::table('convocatoria')->orderBy('id', 'desc')->first()->fecha_pago;
        //$age = DB::table('users')->select('age')->latest('id')->value('age');
        
        $registro->telf_cliente='89382803';//$request->telefono;
        $registro->email_cliente=null;//$request->email;
        $registro->password=Hash::make($request->password);
        $registro->apellidos_cliente=null;//$request->apellidos;
        $registro->direccion_cliente=null;//$request->direccion;
        $registro->unidad_trabajo=null;//$request->unidad;
        $registro->cargo_cliente=null;//$request->cargo;
        $registro->save();

        Auth::login($registro);

        return redirect()->route('logrado')->with('Genial!','Se guardaron con exito');
        //return response()->json(['message' => 'Usuario creado con éxito']);
    }

    public function index(){
        $registro=Cliente::select('nombre_cliente','idcliente')->get();

        return view('clientes',compact('registro'));
    }

    public function show($id){
        $registro=Cliente::find($id);

        return view('clienteid', compact('registro'));
    }

    public function update(Request $request, $id){
        $registro=Cliente::find($id);
        $registro->idcliente=$request->ci;
        $registro->nombre_cliente=$request->nombre;
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
        $resitro->delete();

        return redirect()->route('clientes');
    }

    public function login(Request $request){

       $credentials =[
            
            'password' => $request->password,
            'idcliente' => $request->carnet
        ];
        //$credentials = $request->only('idcliente', 'password');

        if(Auth::attempt($credentials)){

            $request->session()->regenerate();
            return redirect()->intended(route('privado'));
        }else{
            return redirect('fallido');
        }
    }
}
