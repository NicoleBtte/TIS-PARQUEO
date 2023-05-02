<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Pago extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'idtransaccion';
    protected $table='transaccion';
    protected $fillable=['idtransaccion', 'monto', 'fechaPago', 'cliente_idcliente', 'reporte_idreporte'];

    public function guardarArchivo($archivo){
        $ruta = Storage::disk('uploads')->putFile('comprobantes', $archivo);
        $this->comprobante = $ruta;
        $this->save();
        return $ruta;
    }

}