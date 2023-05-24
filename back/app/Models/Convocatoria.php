<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Convocatoria extends Model
{
    //use HasFactory;
    use Notifiable;
    protected $table = 'convocatoria';
    public $timestamps = false;
    protected $primaryKey = 'idConvocatoria';
    protected $fillable = ['idConvocatoria', 'titulo', 'fecha_inicio', 'fecha_fin', 'descripcion_convocatoria', 
    'numero_cupos', 'estado_convocatoria', 'pago_mensual', 'multa_mensual', 'fecha_inicio_gestion', 'pdf_convocatoria', 
    'fecha_inicio_gestion', 'fecha_fin_gestion'];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->password;
    }
}
