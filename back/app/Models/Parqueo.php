<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 
use App\Models\Bitacora; 

class Parqueo extends Model
{
    //use HasFactory;
    use Notifiable;
    protected $table = 'parqueo';
    public $timestamps = false;
    protected $primaryKey = 'idParqueo';
    protected $fillable = ['idParqueo', 'nombre_parqueo', 'administrador_idadministrador', 'numero_de_zonas', 'mapa_parqueo'];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->password;
    }
    
    public function administrador()
    {
        return $this->belongsTo(Administrador::class);
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
