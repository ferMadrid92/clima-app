import useClima from "../hooks/useClima"
import Formulario from "./Formulario"
import Pronostico from "./Pronostico"
import Resultado from "./Resultado"
import Spinner from "./Spinner"

const AppClima = () => {

  const { resultado, cargando, noResultado } = useClima()

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
          <p>El clima se mostrará aquí</p>
        )}
      </main>
      <Pronostico />
    </>
  )
}

export default AppClima
