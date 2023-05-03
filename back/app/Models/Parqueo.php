<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;  

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
}
