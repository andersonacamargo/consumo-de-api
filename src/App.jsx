import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import MouseTracker from './components/mouseTracker';

function App() {
  const API_KEY = '471bbf27'; 
  const [perfil, setPerfil] = useState({})      //Variavel com controle de estado para o objeto perfil
  const [error, setError] = useState(false)     //Variavel com controle de estado para o erros
  const [loading, setLoading] = useState(true)  //Variavel com controle de estado para o Carregamento
  const [DBZ, setDBZ] = useState({})            //Variavel com controle de estado para o objeto DBZ
  const [pokemon, setPokemon] = useState({})    //Variavel com controle de estado para o objeto pokemon
  const [filme, setFilme] = useState({})        //Variavel com controle de estado para o objeto filme
  const [text, setText] = useState(() => {
    return localStorage.getItem('easy-input') || '';
  });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('Avengers');
  const [queryLoading, setQueryLoading] = useState(true)
  const [showTracker, setShowTracker] = useState(true);

  useEffect(() => {                             //inicio do useEffect
    const getData = async () => {               //inicio da função getData
      try {                                     //definição da estrutura try/catch
        const response = await axios.get(       //primeiro consumo da API person mockada, o ID(ultimo numero da URL precisa ser o seu ID)
          "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/1")
        setPerfil(response.data)                //altera a variavel de estado perfil com o objeto retornado pela API
        const responseDBZ = await axios.get(    //segundo consumo de API DBZ, o ultimo numero é o ID do persnagem
          "https://dragonball-api.com/api/characters/10")
        setDBZ(responseDBZ.data)                //altera a variavel de estado DBZ com o objeto retornado pela API
        const responsePoke = await axios.get(   //terceiro consumo de API Pokemon, o ultimo numero ou palavra é o ID do persnagem
          "https://pokeapi.co/api/v2/pokemon/raichu")
        setPokemon(responsePoke.data)           //altera a variavel de estado pokemon com o objeto retornado pela API
        const responseFilme = await axios.get(  //terceiro consumo de API OMDB, nessa precisamos de uma apiKey gerada e o id IMDB de um filme
          `https://www.omdbapi.com/?i=tt0803096&apikey=${API_KEY}`)
        setFilme(responseFilme.data)            //altera a variavel de estado filme com o objeto retornado pela API
        setLoading(false)                       //altera a variavel de estado loadind para falso
      } catch (error) {                         //em caso de erro em qualquer linha acima executa a sequencia do catch
        setLoading(false)                       //altera a variavel de estado loadind para falso
        setError(true)                          //altera a variavel de estado loadind para true
        console.log("Error: ", error)           //apresenta o erro no console
      }

    }
    getData()                                   //chama a função getData
  }, [])                                        //finaliza o useEffect com dependencia vazia (executa ao recarregar a pagina)


  // Toda vez que o 'text' mudar, o useEffect será acionado e salvará no localStorage
  useEffect(() => {
    localStorage.setItem('easy-input', text);
    console.log('Fácil: Salvando no localStorage ->', text);
  }, [text]); // A dependência [text] garante que só execute quando text mudar

  useEffect(() => {
    

    const fetchMovies = async () => {
      setQueryLoading(true);
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        if (response.data.Response === 'True') {
          setMovies(response.data.Search);
        } else {
          setMovies([]); // Limpa se não encontrar nada
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setQueryLoading(false);
      }
    };


    // Usando debounce com setTimeout para evitar disparar a API a cada tecla digitada
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== '') {
        fetchMovies();
      } else {
        setMovies([]); // Limpa a lista se a busca estiver vazia
      }
    }, 800);

    // Função de limpeza (cleanup) do useEffect.
    // Ela cancela o timeout anterior caso o usuário digite novamente antes de 800ms.
    return () => clearTimeout(delayDebounceFn);
  }, [query]); // Executa sempre que a 'query' for alterada

  if (loading) {                                // caso loading true retorna essa div para a pagina
    return (<div>Loading</div>)
  }
  if (error) {                                  // caso error true retorna essa div para a pagina
    return (<div>Ocorreu um erro inesperado</div>)
  }
  return (                                      //se passar pelos ifs anteriores retorna essa pagina
    <>
      <section id="center">                     {/* mantive o retorno do padrão da pagina gerado pelo vite*/}
        <div className="hero">                  {/*alterando apenas o conteudo apresentado, mas podemos trabalhar um um layout novo
                                                     sempre que quisermos, vou abordar isso nas próximas atividades*/}
          <img src={DBZ.image} className="base" width="170" height="179" alt="" /> {/* apresenta a imagem da api do DBZ */}
        </div>
        <div>
          <h1>{perfil.nome}</h1>                {/* Apresenta o nome salvo no objeto perfil */}
        </div>
        <div className="card">
          <h2>UseEffect Nível Fácil: Sincronizar com LocalStorage</h2>
          <p>O que você digitar será salvo automaticamente. Se recarregar a página, não perderá a informação.</p>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite algo para salvar..."
          /></div>
        <div className="card">
          <h2>UseEffect Nível Médio: Consumo de API OMDb com Debounce</h2>
          <p>Busca filmes assim que você para de digitar.</p>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar filme..."
          />

          {queryLoading && <p>Carregando filmes...</p>}

          {!queryLoading && movies.length > 0 && (
            <ul className="movie-list">
              {movies.map((movie) => (
                <li key={movie.imdbID}>
                  <strong>{movie.Title}</strong> ({movie.Year})
            </li>
              ))}
            </ul>
          )}

          {!queryLoading && movies.length === 0 && query !== '' && (
            <p>Nenhum filme encontrado.</p>
          )}
        </div>
        
        <div className="card">
          <h2>UseEffect Nível Difícil: Listener e Memory Leak</h2>
          <p>
            Abra o console do navegador. Clique em "Montar", mexa o mouse e depois clique em "Desmontar".
            Continue mexendo o mouse e veja o que acontece no console!
      </p>
          <button onClick={() => setShowTracker(!showTracker)}>
            {showTracker ? 'Desmontar Componente' : 'Montar Componente'}
          </button>

          {showTracker && <MouseTracker />}
        </div>
      </section>
      <div className="ticks"></div>
      <section id="next-steps">
        <div id="docs">
          <h2>Filme que não gostei</h2>         {/* titulo de uma parte do site */}
          <p>{filme.Title}</p>                  {/* apresenta o titulo do objeto filme */}
          <img src={filme.Poster} width="170" /> {/* apresenta o poster do objeto filme */}
          <p>{filme.Ratings[1].Source}</p>      {/* apresenta uma avaliação do objeto filme */}
          <p>{filme.Ratings[1].Value}</p>
          <p></p>
          <p></p>
        </div>
        <div id="social">
          <h2>Meu pet</h2>                      {/* titulo de uma parte do site */}
          <p>{pokemon.name}</p>                 {/* apresenta o nome do objeto pokemon */}
          <img src={pokemon.sprites.front_default} /> {/* apresenta a imagem do objeto pokemon */}
          <p>{pokemon.types[0].type.name}</p>   {/* apresenta o tipo do objeto pokemon */}
        </div>
      </section>
      <div className="ticks"></div>
    </>
  )
}

export default App                             //retorna minha pagina ou componente
