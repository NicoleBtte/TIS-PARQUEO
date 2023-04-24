<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


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
}
