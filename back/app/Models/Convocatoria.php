<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Convocatoria extends Model
{
    //use HasFactory;
    use Notifiable;
    protected $table = 'convocatorias';
    
    protected $fillable = ['idConvoactoria', 'titulo', 'descripcionConv', 
    'numeroDeZonas', 'estado', 'fecha_actual', 'fecha_fin'];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->password;
    }
}
