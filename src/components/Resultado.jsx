import { useState, useEffect } from "react"
import useClima from "../hooks/useClima"
import { formatearHoras, obtenerHoraActual } from "../utils/helpers"


const Resultado = () => {

    const { resultado, coords } = useClima()

    const [noche, setNoche] = useState(null)

    useEffect(() => {
      const hora = obtenerHoraActual()
      if(hora >= 19 || hora < 6) {
        setNoche(true)
      }  else {
        setNoche(false)
      }
    }, [])

    const { main, weather } = resultado

    const {feels_like, humidity, temp, temp_max, temp_min} = main 

    const { sunrise, sunset } = resultado.sys

    const {name, local_names} = coords || {}

  return (
    <>
      <div id="resultadoClima" className={!noche ? "contenedor clima dia" : "contenedor clima noche" }>
        <h2>{local_names?.es ? local_names?.es : name }:</h2>
        <p>{parseInt(temp)} <span>°C</span></p>
        <div className="clima-descripcion">
          <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={weather[0].description}/>
          <p>{weather[0].description}</p>
        </div>
        <div className="temp-datos">
          <p>Mín: {parseInt(temp_min)} <span>°C</span></p>
          <p>Máx: {parseInt(temp_max)} <span>°C</span></p>
        </div>
        <div className="temp-datos">
          <p>Sensación: {parseFloat(feels_like)}<span>°C</span></p>
          <p>Humedad: {humidity}%</p>
        </div>
        <div className="temp-datos">
          <p>Amanecer: {formatearHoras(sunrise)}</p>
          <p>Atardecer: {formatearHoras(sunset)}</p>
        </div>
      </div>
    </>
  )
}

export default Resultado
