import {useSelector} from 'react-redux'
import pokeIcon from '../assets/pokeapi-icon.png'
import {Link} from 'react-router-dom'
const PokemonElement = () => {
  const {data: pokemon} = useSelector((state) => state.pokemon)

  return (
    <div className="pokemon-element">
      <div>
        <Link to={'/'}>
          <img src={pokeIcon} />
        </Link>
        {pokemon.sprites && (
          <div className="pokemon-image">
            <img src={pokemon.sprites.front_default} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonElement
