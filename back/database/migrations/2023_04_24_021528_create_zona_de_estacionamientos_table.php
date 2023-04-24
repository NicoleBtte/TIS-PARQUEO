<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateZonaDeEstacionamientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('zona_de_estacionamientos', function (Blueprint $table) {
            $table->id('idZonaEstacionamiento');
            $table->string('nombreZona');
            $table->boolean('techo');
            $table->boolean('arbol');
            $table->string('tipoPiso');
            $table->integer('numero_de_sitios');
            $table->string('descripcionZona');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('zona_de_estacionamientos');
    }
}
