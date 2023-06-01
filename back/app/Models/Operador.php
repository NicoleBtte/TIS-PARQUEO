<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Bitacora;

class Operador extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $table='operador';
    protected $primaryKey='idoperador';
    public $timestamps = false;
    protected $fillable=[ 'idoperador', 'nombre_operador', 'telf_operador', 'email_operador', 'pass_operador', 'parqueo_idparqueo'];

    protected $hidden = [
        'pass_operador',
        'remember_token',
    ];

    public function getAuthPassword()
    {
        return $this->pass_operador;
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
