import './App.css'
import MovieEe from './components/movie_search/movie_ee';
import MovieTe from './components/movie_search/movie_te';
import ThemeButton from './components/themeButton';
import {useState} from 'react'
function App() {
  const [dark, setDark] = useState(false)

  const theme = dark ? 'theme-dark' : 'theme-light'

  return (
    <>
      <section id="center">
      <ThemeButton dark={dark}
        onToggle={() => setDark(!dark)} />
        <div className={theme}>
          <MovieEe />
        </div>
        <div className='theme-dark'>
          <MovieTe />
        </div>
      </section>
    </>
  )
}

export default App                           
