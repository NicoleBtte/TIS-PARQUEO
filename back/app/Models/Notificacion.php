<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    protected $table = 'notificaciones';

    protected $fillable = [
        'emisor_notif',
        'receptor_notif',
        'mensaje_notif',
        'administrador_idadministrador',
        'cliente_idcliente',
    ];

    public function administrador()
    {
        return $this->belongsTo(Administrador::class);
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}
