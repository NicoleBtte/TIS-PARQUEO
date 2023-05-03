<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Passport\PersonalAccessTokenResult;

class Administrador extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $primaryKey = 'idadministrador';
    protected $table = 'administrador';
    public $timestamps = false;
    protected $fillable = ['idadministrador', 'nombre_administrador', 'telf_administrador', 
    'email_administrador', 'pass_administrador'];

    protected $hidden = [
        'pass_administrador',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->pass_administrador;
    }
}
