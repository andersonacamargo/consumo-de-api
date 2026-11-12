import './App.css'
import MovieTe from './components/movie_te';
import PokeApi from './components/pokeApi';
import ThemeButton from './components/themeButton';
import { useState } from 'react'
import ExternalLink from './components/externalLink';
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
          <div>
          <h2>Projetos de Alunos da 2ª fase</h2>
          <ExternalLink 
            link="https://consumo-de-api-delta.vercel.app/" 
            nome = "Thales"
            />
            <br></br>
          <ExternalLink 
            link="https://react-projeto-prog-app-yslb.vercel.app/" 
            nome = "João"
            />
            <br></br>
             <ExternalLink 
            link="https://aula-vite.vercel.app" 
            nome = "Luan"
            />
            </div>
        </div>
      </section>
    </div>
  )
}
export default App                           
