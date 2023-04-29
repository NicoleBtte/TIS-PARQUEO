<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;  

class Parqueo extends Model
{
    //use HasFactory;
    use Notifiable;
    protected $table = 'parqueos';
    
    protected $primaryKey = 'idParqueo';
    protected $fillable = ['idParqueo', 'nombreParqueo', 'numero_de_zonas', 'mapaParqueo'];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function getAuthPassword(){
        return $this->password;
    }
}
