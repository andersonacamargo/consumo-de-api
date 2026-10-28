import { useState, useEffect } from 'react';

export default function MovieTe() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('spider man');
  const API_KEY = '471bbf27'; 

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]); // Limpa se não encontrar nada
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
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


  return (
    <div className="card">
     
      <h2>Busca filmes assim que você para de digitar.</h2>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Buscar filme..."
      />
      
      {loading 
      ? <p>Carregando filmes...</p>
      : movies.length > 0 
        ? <ul className="movie-list">
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <strong>{movie.Title}</strong> ({movie.Year})
              </li>
            ))}
          </ul>
        : <p>Nenhum filme encontrado.</p>
      }
      
    </div>
  );
}
