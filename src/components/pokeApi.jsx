import { useState, useEffect } from 'react';
import axios from 'axios';
export default function PokeApi() {
    const [loading, setLoading] = useState(true)
    const [pokemon, setPokemon] = useState({})
    const [query, setQuery] = useState('raichu');
    const [numero, setNumero] = useState(null);

    const gerarNumero = () => {
        // Gera um inteiro de 1 a 1000
        const novoNumero = Math.floor(Math.random() * 1000) + 1;
        setNumero(novoNumero);
    };

    useEffect(() => {
        setQuery('')
        const getData = async () => {
            try {
                const responsePoke = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${numero}`)
                setPokemon(responsePoke.data)
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            } finally {
                setLoading(false);
            }

        }
        getData();
    }, [numero]);                                       //finaliza o useEffect com dependencia vazia (executa ao recarregar a pagina)

    useEffect(() => {
        const getData = async () => {
            try {
                const responsePoke = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${query}`)
                setPokemon(responsePoke.data)

            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            } finally {
                setLoading(false);
            }

        }
        const delayDebounceFn = setTimeout(() => {
            if (query.trim() !== '') {
                getData();
            } else {
                setPokemon({}); // Limpa a lista se a busca estiver vazia
            }
        }, 800);

        // Função de limpeza (cleanup) do useEffect.
        // Ela cancela o timeout anterior caso o usuário digite novamente antes de 800ms.
        return () => clearTimeout(delayDebounceFn);
    }, [query]);                                       //finaliza o useEffect com dependencia vazia (executa ao recarregar a pagina)


    return (
        <div className="card">
            <h2>Meu Pokemon</h2>
            <br></br>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar pokemon..."
            />

            <button
                onClick={gerarNumero}
       
            >
                Gerar pokemon Aleatório
            </button>
            {loading
                ? <p>Carregando pokemon...</p>
                : pokemon?.name
                    ? <div>
                        <p>Nome: {pokemon.name}</p>
                        <img src={pokemon.sprites.front_default} />
                        <p>Elemento: {pokemon.types[0].type.name}</p>
                    </div>
                    : <p>Nenhum pokemon encontrado.</p>
            }

        </div>
    )

}