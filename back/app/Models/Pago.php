<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table='transaccion';
    protected $fillable=['idtransaccion', 'monto', 'fechaPago', 'cliente_idcliente', 'reporte_idreporte'];


}