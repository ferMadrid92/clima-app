import { useState, useEffect } from "react"
import Formulario from "./Formulario"
import Resultado from "./Resultado"
import Spinner from "./Spinner"
import useClima from "../hooks/useClima"
import { filtrarLista, formatearFecha } from "../utils/helpers"

const AppClima = () => {
  const [pronosticoFiltro, setPronosticoFiltro] = useState([])

  const { resultado, cargando, cargandoPronostico, noResultado, pronostico, coords } = useClima()

  useEffect(() => {
    const obtenerDatos = async () => {
      if (Object.values(pronostico).length !== 0) {
        const datosFiltrados = await filtrarLista(list, (elemento, indice) => {
          return indice % 4 === 0
        })
        setPronosticoFiltro(datosFiltrados)
      } else {
        setPronosticoFiltro([])
      }
    }
    obtenerDatos()
  }, [pronostico, resultado])

  const { list } = pronostico
  const {name, local_names} = coords || {}

  return (
    <>
      <main className="dos-columnas">
        <Formulario />
        {cargando ? (
          <Spinner />
        ) : resultado?.name ? (
          <Resultado />
        ) : noResultado ? (
          <p>{noResultado}</p>
        ) : (
          <p>El clima se va a mostrar aquí</p>
        )}
      </main>
      {cargandoPronostico ? <Spinner/> : (
      <section className="pronostico">       
        {Object.values(pronosticoFiltro).length !== 0 ? (
          <>
          <h2 className="heading-pronostico">Pronóstico del clima en {local_names?.es ? local_names?.es : name } (5 días)</h2>
            {pronosticoFiltro.map((elemento) => (
              <div className="datos-pronostico" key={elemento.dt}>
                <p>
                  Fecha: <b>{formatearFecha(elemento.dt_txt)}</b>
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${elemento.weather[0].icon}@2x.png`}
                  alt={elemento.weather[0].description}
                />
                <p>
                  Mín:{" "}
                  <b>
                    {elemento.main.temp_min}
                    <span>°C</span>
                  </b>
                </p>
                <p>
                  Max:{" "}
                  <b>
                    {elemento.main.temp_max}
                    <span>°C</span>
                  </b>
                </p>
                <p>
                  Probabilidad de lluvia:{" "}
                  <b>{(elemento.pop * 100).toFixed()}%</b>
                </p>
              </div>
            ))}
          </>
        ) : null}
      </section>
       )}
    </>
  )
}

export default AppClima
