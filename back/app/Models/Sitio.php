<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sitio extends Model
{
    use HasFactory;
    protected $table= 'sitio';
    public $timestamps = false;
    protected $primaryKey = 'idsitio';
    protected $fillable = ['idsitio', 'zonaEstacionamiento_idzonaEstacionamiento','cliente_idcliente','numero'];
}
