<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;
    protected $table= 'turno';
    public $timestamps = false;
    protected $primaryKey='idturno';
    protected $fillable = ['idturno','guardia_idguardia','dia_turno', 'hora_inicio_turno', 'hora_fin_turno', 'nombre_turno'];

    public function guardias()
    {
        return $this->belongsToMany(Guardia::class, 'turno_has_guardia', 'turno_idturno', 'guardia_idguardia');
    }
}