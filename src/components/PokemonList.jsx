import {useDispatch, useSelector} from 'react-redux'
import {
  changePage,
  fetchPokemons,
} from '../features/pokemonList/pokemonListSlice'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import pokeball from '../assets/pokeball.png'
import {resetPokemon} from '../features/pokemon/pokemonSlice'

export const PokemonList = () => {
  const dispatch = useDispatch()
  const pokemonData = useSelector((state) => state.pokemonList)
  const pokemonStats = useSelector((state) => state.pokemon)

  useEffect(() => {
    if (pokemonStats) {
      dispatch(resetPokemon())
    }
    if (pokemonData.page >= 0) {
      dispatch(fetchPokemons(pokemonData.page))
    }
  }, [pokemonData.page])

  if (!pokemonData.data.results) {
    return <h1>No Data</h1>
  }

  if (pokemonData.loading) {
    return <h1>Loading...</h1>
  }

  if (pokemonData.error !== '') {
    return <h1>{pokemonData.error}</h1>
  }

  return (
    <>
      <div className="list-container">
        {pokemonData.data.results.map((pokemon) => {
          return (
            <div key={pokemon.name} className="pokemon-list">
              <ul>
                <Link to={`/pokemon/${pokemon.name}`}>
                  <li>
                    {pokemon.name}
                    <img src={pokeball} />
                  </li>
                </Link>
              </ul>
            </div>
          )
        })}
      </div>
      <div className="button-container">
        <button
          disabled={!pokemonData.page}
          onClick={() => dispatch(changePage({newPage: pokemonData.page - 1}))}>
          back
        </button>
        <button
          disabled={pokemonData.page === 7}
          onClick={() => dispatch(changePage({newPage: pokemonData.page + 1}))}>
          Next
        </button>
      </div>
    </>
  )
}
