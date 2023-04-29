<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialEntradasSalidas extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table='historial_entradas_salidas';
    protected $fillable=['idhistorial', 'hora_ingreso_hist', 'hora_salida_hist', 'fecha_ingreso', 'fecha_salida',
    'cliente_id_cliente'];

    /*public function cliente(){
        return $this->belongsTo(Cliente::class, 'cliente_idcliente');
    }*/

}
