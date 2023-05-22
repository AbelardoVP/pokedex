import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {fetchPokemon} from '../features/pokemon/pokemonSlice'

const Pokemon = () => {
  const dispatch = useDispatch()
  const {pokemon} = useParams()
  const {data: pokemonData} = useSelector((state) => state.pokemon)

  useEffect(() => {
    dispatch(fetchPokemon(pokemon))
  }, [])

  if (!pokemonData.abilities) {
    return <h1>No Data</h1>
  }

  if (pokemonData.loading) {
    return <h1>Loading...</h1>
  }

  console.log(pokemonData)
  return (
    <div className="details-container">
      <h3>Type</h3>
      <h4>{pokemonData.types[0].type.name}</h4>
      <div className="details">
        <h4>Number:{pokemonData.id}</h4>
        <h4>Name:{pokemonData.name}</h4>
        <h4>Height: {pokemonData.height}</h4>
        <h4>Weight: {pokemonData.weight}</h4>
      </div>
      <div className="stats-container">
        <div>
          <p>Stats</p>

          <div className="stats">
            {pokemonData.stats.map((stat, id) => {
              return (
                <h4 key={id}>
                  {stat.stat.name}: {stat.base_stat}{' '}
                </h4>
              )
            })}
          </div>
        </div>
        <div>
          <p>Abilities</p>
          {pokemonData.abilities.map((abilitie, id) => {
            return <h3 key={id}>{abilitie.ability.name}</h3>
          })}
        </div>
      </div>
    </div>
  )
}

export default Pokemon
