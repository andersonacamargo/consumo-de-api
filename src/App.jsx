import './App.css'
import MovieTe from './components/movie_te';
import PokeApi from './components/pokeApi';
import ThemeButton from './components/themeButton';
import { useState } from 'react'
function App() {
  const [dark, setDark] = useState(false)
  const [code, setCode] = useState(false)

  const theme = dark ? 'theme-dark' : 'theme-light'
  const showCode = code ? 'Mostrar Código' : 'Mostrar Componentes'

  return (
    <div className={`body ${theme}`}>

      <section className="center">
        <ThemeButton dark={dark}
          onToggle={() => setDark(!dark)} />
        <div className={theme}>
          <h2 >Consumo de API OMDb(filmes) e Pokemon com Debounce</h2>
        </div>
        <div className={theme}>
          <MovieTe />
          <PokeApi />
        </div>
      </section>
    </div>
  )
}
export default App                           
