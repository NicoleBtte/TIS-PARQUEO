<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operador extends Authenticatable
{
    use HasFactory;
    protected $table='idoperador';
    protected $primaryKey='idoperador';
    public $timestamps = false;
    protected $fillable=[ 'idoperador', 'nombre_operador', 'telf_operador', 'email_operador', 'pass_operador', 'parqueo_idparqueo'];

    protected $hidden = [
        'pass_operador',
        'remember_token',
    ];

    public function getAuthPassword()
    {
        return $this->pass_operador;
    }
}
