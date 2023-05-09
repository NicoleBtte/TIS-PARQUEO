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
        $pago = json_decode($json);
    @endphp
    <ul>
           {{-- // Iterar sobre los clientes y mostrar los valores deseados --}}
    {{-- @foreach ($pagos as $pago) --}} 
        <li>idtransaccion: {{$pago->idtransaccion}}</li>
        <li>Comprobante: <br>
            @php
            $rute=$pago->comprobante;
            $path = storage_path("app/uploads/".$rute);
            $file = file_get_contents($path);
            $type = mime_content_type($path);
            $data = base64_encode($file);

            // Crear la sintaxis de datos URI
            $src = "data:{$type};base64, {$data}";
            @endphp
            <img src="{{$src}}" alt="imagen1">
        </li>
    {{-- @endforeach --}}
    </ul>
</body>
</html>