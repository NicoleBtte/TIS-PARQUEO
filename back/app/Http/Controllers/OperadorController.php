<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Operador;

class OperadorController extends Controller
{
    //

    public function show(Request $request){
        $consultaOperador=Operador::find($request->carnet);
        return response()->json(json_encode($consultaOperador));
    }
}
