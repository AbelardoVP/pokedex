import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'

const initialState = {
  loading: false,
  error: '',
  data: [],
}

export const fetchPokemon = createAsyncThunk('get-pokemon', async (name) => {
  try {
    const {data} = await axios(`${POKEMON_URL}/${name}`)
    return data
  } catch (error) {
    console.log(error)
  }
})

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    resetPokemon: (state) => {
      state.data = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.fulfilled, (state, {payload}) => {
      state.loading = false
      state.data = payload
    })
    builder.addCase(fetchPokemon.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchPokemon.rejected, (state) => {
      state.loading = false
      state.error = 'Error fetching pokemon data'
    })
  },
})

export const pokemonReducer = pokemonSlice.reducer
export const {resetPokemon} = pokemonSlice.actions
