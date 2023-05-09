<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form method="POST" action="/api/consultaComprobante" target="_blank">
        @csrf
        <label for="idtransaccion">ID de transacción:</label>
        <input type="text" name="idtransaccion" id="idtransaccion">
        <button type="submit">Consultar comprobante</button>
    </form>    
</body>
</html>