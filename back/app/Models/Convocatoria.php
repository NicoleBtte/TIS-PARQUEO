<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Bitacora;

class Convocatoria extends Model
{
    //use HasFactory;
    use Notifiable;
    protected $table = 'convocatoria';
    public $timestamps = false;
    protected $primaryKey = 'idConvocatoria';
    protected $fillable = ['idConvocatoria', 'titulo', 'fecha_inicio', 'fecha_fin', 'descripcion_convocatoria', 
    'numero_cupos', 'estado_convocatoria', 'pago_mensual', 'multa_mensual', 'fecha_inicio_gestion', 'pdf_convocatoria', 
    'fecha_inicio_gestion', 'fecha_fin_gestion'];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->password;
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
