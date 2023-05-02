<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    @php
        $pagos = json_decode($json);
    @endphp
    <ul>
           // Iterar sobre los clientes y mostrar los valores deseados
    @foreach ($pagos as $pago) 
        <li>idtransaccion: {{$pago->idtransaccion}}</li>
        <li>Comprobante: <br>
            <img src="../../storage/app/uploads/{{$pago->comprobante}}" alt="imagen1">
        </li>
    @endforeach
    </ul>
</body>
</html>