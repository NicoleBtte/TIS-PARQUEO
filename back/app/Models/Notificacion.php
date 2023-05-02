<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    protected $table = 'notificaciones';

    protected $primaryKey = 'idnotificaciones';
    public $timestamps = false;
    protected $fillable = [
        'idnotificaciones',
        'emisor_notif',
        'receptor_notif',
        'titulo_notif',
        'mensaje_notif',
        'fecha_notif',
        'administrador_idadministrador',
        'cliente_idcliente',
        'operador_idoperador',
    ];

    public function administrador()
    {
        return $this->belongsTo(Administrador::class);
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function operador()
    {
        return $this->belongsTo(Operador::class);
    }
}
