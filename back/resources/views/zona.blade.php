<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<form action="/api/zona" method="POST">
  @csrf
  <div>
    <label for="nombre_zona_estacionamiento">Nombre de la zona de estacionamiento:</label>
    <input type="text" name="nombre_zona_estacionamiento" id="nombre_zona_estacionamiento">
  </div>
  <div>
    <label for="parqueo_idparqueo">ID del parqueo:</label>
    <input type="text" name="parqueo_idparqueo" id="parqueo_idparqueo">
  </div>
  <div>
    <label for="tipo_de_piso">Tipo de piso:</label>
    <input type="text" name="tipo_de_piso" id="tipo_de_piso">
  </div>
  <div>
    <label for="numero_de_sitios">Número de sitios:</label>
    <input type="text" name="numero_de_sitios" id="numero_de_sitios">
  </div>
  <div>
    <label for="descripcion">Descripción:</label>
    <textarea name="descripcion" id="descripcion"></textarea>
  </div>
  <button type="submit">Guardar</button>
</form>

</body>
</html>