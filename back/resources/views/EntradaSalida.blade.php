<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/api/entrada" method="post">
        <label for="id">ID:</label>
        <input type="number" id="id" name="id" required><br><br>
      
        <label for="idcliente">ID Cliente:</label>
        <input type="number" id="idcliente" name="idcliente" required><br><br>
      
        <input type="submit" value="Guardar">
      </form>
      
</body>
</html>