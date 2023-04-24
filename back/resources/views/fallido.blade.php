<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>LO siento INCORRECTO</h1>
    @if(Session::has('errors_json'))
    @php
        $errors_json = json_decode(Session::get('errors_json'), true);
    @endphp
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors_json as $field => $errors)
                @foreach ($errors as $error)
                    <li>{{ $field }}: {{ $error }}</li>
                @endforeach
            @endforeach
        </ul>
    </div>
@endif


</body>
</html>