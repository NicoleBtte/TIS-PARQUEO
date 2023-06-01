<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Passport\PersonalAccessTokenResult;
use App\Models\Bitacora;
use Carbon\Carbon;


/*class Cliente extends Model
{
    public function crearToken()
    {
        $token = $this->createToken('Nombre del token');
        
        return new PersonalAccessTokenResult($token->token, $token->token->id, $token->accessToken);
    }
}*/



class Cliente extends Authenticatable
{
    //use HasFactory;
    use HasApiTokens, Notifiable;
    protected $primaryKey = 'idcliente';
    protected $table = 'cliente';
    public $timestamps=false;
    protected $fillable = ['idcliente', 'nombre_cliente', 'estado_pago', 
    'monto_a_pagar', 'fecha_pagado', 'fecha_lim_pago', 'telf_cliente', 
    'email_cliente', 'password', 'apellidos_cliente', 'direccion_cliente','unidad_trabajo', 
    'cargo_cliente'];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->password;
    }

    /*public function createToken()
    {
        $token = $this->createToken('access_token');
        
        return new PersonalAccessTokenResult($token->token, $token->token->id, $token->accessToken);
    }*/

    public function transacciones()
    {
        return $this->hasMany(Pago::class, 'cliente_idcliente');
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
