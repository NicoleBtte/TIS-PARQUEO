import moment from "moment";
export function validarTitulo(titulo) {
  // Expresión regular para permitir solo letras y números
  var regex = /^[a-zA-Z0-9\s]+$/;

  // Validar longitud del título
  if (titulo.length < 5 || titulo.length > 32) {
    return false;
  }

  // Validar caracteres especiales en el título
  if (!regex.test(titulo)) {
    return false;
  }

  return true;
}

export function validarNombre(nombre) {
  // Expresión regular para permitir solo letras y números
  var regex = /^[a-zA-Z0-9\s]+$/;

  // Validar longitud del título
  if (nombre.length < 4 || nombre.length > 25) {
    return false;
  }

  // Validar caracteres especiales en el título
  if (!regex.test(nombre)) {
    return false;
  }

  return true;
}

export function validarDescripcion(descripcion) {
  // Expresión regular para permitir solo letras y números
  var regex = /^[a-zA-Z0-9\s]+$/;

  // Validar longitud de la descripción
  if (descripcion.length < 16 || descripcion.length > 48) {
    return false;
  }

  // Validar caracteres especiales en la descripción
  /*if (!regex.test(descripcion)) {
    return false;
  }*/

  return true;
}

export function validarDescripcionZona(descripcion) {
  // Expresión regular para permitir solo letras y números
  var regex = /^[a-zA-Z0-9\s]+$/;

  // Validar longitud de la descripción
  if (descripcion.length < 7 || descripcion.length > 20) {
    return false;
  }

  // Validar caracteres especiales en la descripción
  /*if (!regex.test(descripcion)) {
    return false;
  }*/

  return true;
}

export function validarNumeroSitios(numeroSitios) {
  // Convertir el valor a número entero
  numeroSitios = parseInt(numeroSitios);

  // Verificar que el valor sea un número válido
  if (isNaN(numeroSitios)) {
    return false;
  }

  // Verificar que el número sea mayor o igual a 1
  if (numeroSitios < 1) {
    return false;
  }

  return true;
}

export function validarPagoMensual(pagoMensual) {
  // Convertir el valor a número entero
  pagoMensual = parseInt(pagoMensual);

  // Verificar que el valor sea un número válido
  if (isNaN(pagoMensual)) {
    return false;
  }

  // Verificar que el número sea mayor o igual a 1
  if (pagoMensual < 1 || pagoMensual > 1000) {
    return false;
  }

  return true;
}

export function validarMultaMensual(multaMensual) {
  // Convertir el valor a número entero
  multaMensual = parseInt(multaMensual);

  // Verificar que el valor sea un número válido
  if (isNaN(multaMensual)) {
    return false;
  }

  // Verificar que el número sea mayor o igual a 1
  if (multaMensual < 0 || multaMensual > 1000) {
    return false;
  }

  return true;
}

export function validarMonto(monto) {
  // Convertir el valor a número entero
  monto = parseInt(monto);

  // Verificar que el valor sea un número válido
  if (isNaN(monto)) {
    return false;
  }

  // Verificar que el número sea mayor o igual a 1
  if ((monto < 10) | (monto > 1000)) {
    return false;
  }

  return true;
}

export function validarFechas(convocatorias, fechaInicioNueva, fechaFinNueva) {
  for (let i = 0; i < convocatorias.length; i++) {
    const convocatoriaExistente = convocatorias[i];

    // Convertir fechas a milisegundos
    const fechaInicioExistente = Date.parse(convocatoriaExistente.fecha_inicio);
    const fechaFinExistente = Date.parse(convocatoriaExistente.fecha_fin);
    const fechaInicioNuevaMs = Date.parse(fechaInicioNueva);
    const fechaFinNuevaMs = Date.parse(fechaFinNueva);

    // Verificar solapamiento
    if (
      (fechaInicioNuevaMs >= fechaInicioExistente &&
        fechaInicioNuevaMs <= fechaFinExistente) ||
      (fechaFinNuevaMs >= fechaInicioExistente &&
        fechaFinNuevaMs <= fechaFinExistente)
    ) {
      return false; // hay solapamiento
    }
  }

  return true; // no hay solapamiento
}
