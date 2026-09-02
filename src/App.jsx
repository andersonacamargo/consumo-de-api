import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [perfil, setPerfil] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [DBZ, setDBZ] = useState({})
  const [pokemon, setPokemon] = useState({})
  const [filme, setFilme] = useState({})
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/1")
        setPerfil(response.data)
        const responseDBZ = await axios.get(
          "https://dragonball-api.com/api/characters/10")
        setDBZ(responseDBZ.data)
        const responsePoke = await axios.get("https://pokeapi.co/api/v2/pokemon/raichu")
        setPokemon(responsePoke.data)
        const responseFilme = await axios.get("https://www.omdbapi.com/?i=tt0803096&apikey=471bbf27")
        setFilme(responseFilme.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
        console.log("Error: ", error)
      }

    }
    getData()
  }, [])

  if (loading) {
    return (<div>Loading</div>)
  }
  if (error) {
    return (<div>Ocorreu um erro inesperado</div>)
  }
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={DBZ.image} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>{perfil.nome}</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Filme que não gostei</h2>
          <p>{filme.Title}</p>
          <img src={filme.Poster} width="170"/>
          <p>{filme.Ratings[1].Source}</p>
          <p>{filme.Ratings[1].Value}</p>
          <p></p>
          <p></p>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Meu pet</h2>
          <p>{pokemon.name}</p>
          <img src={pokemon.sprites.front_default} />
          <p>{pokemon.types[0].type.name}</p>

        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
