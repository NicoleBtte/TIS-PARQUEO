<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Bitacora;

class Notificacion extends Model
{
    protected $table = 'notificacion';

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

    protected static function boot(){
        parent::boot();

        static::created(function ($model) {
            Bitacora::create([
                'tipo_operacion' => 'creacion',
                'nombre_tabla' => json_encode($model->getTable()),
                'valores_antiguos' => null,
                'valores_nuevos' => json_encode($model->toJson()),
                //'fecha' => $fechaHoraFormateada,
                // Agrega aquí cualquier otra información relevante que desees guardar en la bitácora
            ]);
        });

        static::updated(function ($model) {
            Bitacora::create([
                'tipo_operacion' => 'actualizacion',
                'nombre_tabla' => json_encode($model->getTable()),
                'valores_antiguos' => json_encode($model->getOriginal()),
                'valores_nuevos' => json_encode($model->toJson()),
                //'fecha' => $fechaHoraFormateada,
                // Agrega aquí cualquier otra información relevante que desees guardar en la bitácora
            ]);
        });
    }
}
