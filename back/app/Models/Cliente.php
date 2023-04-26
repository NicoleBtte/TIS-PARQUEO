<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Passport\PersonalAccessTokenResult;

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
    use Notifiable;
    protected $table = 'cliente';
    
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

    public function createToken()
    {
        $token = $this->createToken('access_token');
        
        return new PersonalAccessTokenResult($token->token, $token->token->id, $token->accessToken);
    }
}
