import { useState, createContext } from "react"
import axios from "axios"

const ClimaContext = createContext()

const ClimaProvider = ({children}) => {

    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: ''
    })
    const [coords, setCoords] = useState({})
    const [resultado, setResultado] = useState({})
    const [pronostico, setPronostico] = useState({})
    const [cargando, setCargando] = useState(false)
    const [cargandoPronostico, setCargandoPronostico] = useState(false)
    const [noResultado, setNoResultado] = useState(false)

    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const consultarCLima = async datos => {
        setCargando(true)
        setNoResultado(false)
        try {
            const { ciudad, pais } = datos

            const appId = import.meta.env.VITE_API_KEY
            
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`

            const { data } = await axios(url)
            setCoords(data[0])
            const { lat, lon } = data[0]

            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`

            const { data: clima } = await axios(urlClima)
            
            setResultado(clima)
            setPronostico({})

        } catch(error) {
            setNoResultado('No hay resultados')
        } finally {
            setCargando(false)
        }
    }

    //obtener el pronóstico
    const obtenerPronostico = async () => {
        setCargandoPronostico(true)
        setNoResultado(false)
        try {
            const { lat, lon } = coords
            const appId = import.meta.env.VITE_API_KEY

            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`

            const { data } = await axios(url)

            setPronostico(data)
        } catch (error) {
            setNoResultado('No hay resultados')
        } finally {
            setCargandoPronostico(false)
        }
    }

    return (
        <ClimaContext.Provider
            value={{
                busqueda,
                datosBusqueda,
                consultarCLima,
                resultado,
                setResultado,
                cargando,
                cargandoPronostico,
                noResultado,
                obtenerPronostico,
                pronostico,
                setPronostico,
                coords
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}
export default ClimaContext