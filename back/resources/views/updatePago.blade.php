<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form method="POST" action="/api/updatePago" enctype="multipart/form-data">
        <label for="idtransaccion">ID de Transacción:</label>
        <input type="text" id="idtransaccion" name="idtransaccion">
        <label for="comprobante">Comprobante</label>
        <input type="file" name="imagen">
        <button type="submit">Enviar</button>
        <!-- campos del formulario aquí -->
        
        <!-- más campos del formulario aquí -->
    </form>
</body>
</html>