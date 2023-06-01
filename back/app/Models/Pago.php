<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Models\Bitacora;
use Carbon\Carbon;


class Pago extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'idtransaccion';
    protected $table='transaccion';
    protected $fillable=['idtransaccion', 'monto', 'fechaPago', 'tipo_de_pago','cliente_idcliente', 'reporte_idreporte', 'comprobante'];

    public function guardarArchivo($archivo){
        $ruta = Storage::disk('uploads')->putFile('comprobantes', $archivo);
        $this->comprobante = $ruta;
        $this->save();
        return $ruta;
    }

    protected static function boot(){
        parent::boot();

        static::created(function ($model) {
            Bitacora::create([
                'tipo_operacion' => 'creacion',
                'nombre_tabla' => json_encode($model->getTable()),
                'valores_antiguos' => null,
                'valores_nuevos' => json_encode($model->toJson()),
                //'fecha' => $fechaHoraFormateada,
                // Agrega aquí cualquier otra información relevante que desees guardar en la bitácora
            ]);
            
        });

        static::updated(function ($model) {
            Bitacora::create([
                'tipo_operacion' => 'actualizacion',
                'nombre_tabla' => json_encode($model->getTable()),
                'valores_antiguos' => json_encode($model->getOriginal()),
                'valores_nuevos' => json_encode($model->toJson()),
                //'fecha' => $fechaHoraFormateada,
                // Agrega aquí cualquier otra información relevante que desees guardar en la bitácora
            ]);
        });
    }


}