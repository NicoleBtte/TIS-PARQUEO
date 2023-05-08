<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Passport\PersonalAccessTokenResult;

class Guardia extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $primaryKey = 'idguardia';
    protected $table = 'guardia';
    public $timestamps=false;
    protected $fillable = ['idguardia', 'nombre_guardia', 'telefono_guardia', 
    'zonaEstacionamiento_idzonaEstacionamiento', 'pass_guardia',];

    protected $hidden = [
        'pass_guardia',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->pass_guardia;
    }
}
