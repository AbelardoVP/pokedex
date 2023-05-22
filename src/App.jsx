import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import {PokemonList} from './components/PokemonList'
import Pokemon from './components/Pokemon'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {fetchPokemons} from './features/pokemonList/pokemonListSlice'
import PokemonElement from './components/PokemonElement'
function App() {
  const dispatch = useDispatch()

  // useEffect(()=> {
  //   dispatch(fetchPokemons())
  // },[])

  return (
    <div className="row container">
      <PokemonElement />
      <div>
        <Routes>
          <Route path="/" element={<PokemonList />}></Route>
          <Route path="/pokemon/:pokemon" element={<Pokemon />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
