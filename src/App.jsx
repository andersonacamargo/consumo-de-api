import './App.css'
import MovieEe from './components/movie_search/movie_ee';
import MovieTe from './components/movie_search/movie_te';
import PokeApi from './components/pokeApi';
import ThemeButton from './components/themeButton';
import { useState } from 'react'
function App() {
  const [dark, setDark] = useState(false)

  const theme = dark ? 'theme-dark' : 'theme-light'

  return (
    <>
      <section className="center">
        <ThemeButton dark={dark}
          onToggle={() => setDark(!dark)} />
        <h2>Consumo de API OMDb(filmes) e Pokemon com Debounce</h2>
        <div className={theme}>

          <MovieTe />
          <PokeApi />
        </div>
      </section>
    </>
  )
}

export default App                           
