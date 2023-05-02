<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

class ZonaDeEstacionamiento extends Model
{
    //use HasFactory;
    use Notifiable;
    public $timestamp = false;
    protected $table = 'zonaEstacionamiento';
    
    protected $primaryKey = 'idzonaEstacionamiento';
    protected $fillable = ['idzonaEstacionamiento', 'nombre_zona_estacionamiento', 'techo', 'arboles_cerca',
    'tipo_de_piso', 'numero_de_sitios', 'descripcion','parqueo_idparqueo'];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->password;
    }use HasFactory;
}
