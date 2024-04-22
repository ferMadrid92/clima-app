export const formatearHoras = fecha => {
  const fechaNueva = new Date(fecha * 1000)
  const opciones = {
    hour: "2-digit",
    minute: "2-digit",
  }
  const horario = fechaNueva.toLocaleTimeString("es-MX", opciones)
  return horario
}

export const obtenerHoraActual = () => {
  const horaActual = new Date().getHours()
  return horaActual
}

export const filtrarLista = (list, condicion) => {
  const datosFiltrados = list.filter(condicion)
  return datosFiltrados
}

export const formatearFecha = fecha => {
  const fechaNueva = new Date (fecha)
  const opciones = {
      //year: 'numeric',
      //month: 'long',
      //day: 'numeric',
      weekday: 'long'
      //hour: '2-digit',
      //minute: "2-digit"
  }
  return fechaNueva.toLocaleDateString('es-ES', opciones)
}