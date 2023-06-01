<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 
use App\Models\Bitacora;

class ZonaDeEstacionamiento extends Model
{
    //use HasFactory;
    use Notifiable;
    //public $timestamp = false;
    protected $table = 'zonaestacionamiento';
    
    protected $primaryKey = 'idzonaEstacionamiento';
    protected $fillable = ['idzonaEstacionamiento', 'nombre_zona_estacionamiento', 'techo', 'arboles_cerca',
    'tipo_de_piso', 'numero_de_sitios', 'descripcion','parqueo_idparqueo'];
    public $timestamps = false;
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->password;
    }use HasFactory;

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
