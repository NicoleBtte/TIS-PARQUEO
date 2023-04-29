<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sitio extends Model
{
    use HasFactory;
    protected $table= 'sitio';
    protected $fillable = ['zonaEstacionamiento_idzonaEstacionamiento','cliente_idcliente','numero'];
}
