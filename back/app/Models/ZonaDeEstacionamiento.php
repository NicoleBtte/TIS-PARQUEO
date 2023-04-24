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
    protected $table = 'zona_de_estacionamientos';
    
    protected $fillable = ['idZonaEstacionamiento', 'nombreZona', 'techo', 'arbol',
    'tipoPiso', 'numero_de_sitios', 'descripcionZona'];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->password;
    }use HasFactory;
}
