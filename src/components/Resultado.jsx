import useClima from "../hooks/useClima"

const Resultado = () => {

    const { resultado } = useClima()

    const { name, main } = resultado

    const {feels_like, humidity, temp, temp_max, temp_min} = main 

  return (
    <div className="contenedor clima">
      <h2>El Clima de {name} es:</h2>
      <p>{parseInt(temp)} <span>°C</span></p>
      <div className="temp-datos">
        <p>Mín: {parseInt(temp_min)} <span>°C</span></p>
        <p>Máx: {parseInt(temp_max)} <span>°C</span></p>
      </div>
      <div className="temp-datos">
        <p>Sensación: {parseFloat(feels_like)}<span>°C</span></p>
        <p>Humedad: {humidity}%</p>
      </div>
    </div>
  )
}

export default Resultado
