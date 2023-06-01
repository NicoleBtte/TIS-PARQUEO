<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Bitacora extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $primaryKey = 'idbitacora';
    protected $table='bitacora';
    protected $fillable=['tipo_operacion','nombre_tabla','id_registro','valores_antiguos','valores_nuevos'];

}