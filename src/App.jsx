import './App.css'
import MovieEe from './components/movie_search/movie_ee';
import MovieTe from './components/movie_search/movie_te';
import MovieIf from './components/movie_search/movie_if';



function App() {
 
  return (                                      //se passar pelos ifs anteriores retorna essa pagina
    <>
      <section id="center">                     {/* mantive o retorno do padrão da pagina gerado pelo vite*/}
     
        <MovieEe />
        <MovieTe />
        <MovieIf />
  </section>
    </>
  )
}

export default App                             //retorna minha pagina ou componente
