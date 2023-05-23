<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Notificacion extends Model
{
    protected $table = 'notificaciones';

    protected $primaryKey = 'idnotificaciones';
    public $timestamps = false;
    protected $fillable = [
        'idnotificaciones',

        'emisor_notif',
        'receptor_notif',
        'idemisor',
        'idreceptor',
        'titulo_notif',
        'mensaje_notif',
        'fecha_notif',
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
