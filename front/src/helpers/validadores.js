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

export function validarFechaInicio(fecha) {
  const fechaActual = moment().format("YYYY-MM-DD");
  const fechaIngresada = moment(fecha).format("YYYY-MM-DD");

  if (fechaIngresada < fechaActual) {
    return false;
  } else {
    return true;
  }
}

export function validarFechaFin(fecha, fechaInicio = null) {
  // Obtener la fecha actual
  const fechaActual = moment().startOf("day");

  // Validar que la fecha sea válida y no esté en el pasado
  if (
    !moment(fecha, "YYYY-MM-DD", true).isValid() ||
    moment(fecha, "YYYY-MM-DD").isBefore(fechaActual)
  ) {
    return false;
  }

  // Validar que la fecha de inicio no sea mayor a la fecha de fin (si se especificó la fecha de inicio)
  if (fechaInicio && moment(fecha, "YYYY-MM-DD").isBefore(fechaInicio)) {
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
