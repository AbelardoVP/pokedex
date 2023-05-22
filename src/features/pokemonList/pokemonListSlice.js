import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  data: {},
  loading: false,
  error: '',
  page: 0,
}

export const fetchPokemons = createAsyncThunk('get-pokemons', async (page) => {
  try {
    const offset = page * 20
    const limit = page * 20 + 20

    let url
    if (page === 7) {
      url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=11`
    } else {
      url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    }

    const {data} = await axios(url)
    return data
  } catch (error) {
    console.log(error)
  }
})

const pokemonListSlice = createSlice({
  name: 'pokedexSlice',
  initialState,
  reducers: {
    changePage: (state, {payload}) => {
      state.page = payload.newPage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, {payload}) => {
      state.loading = false
      state.data = payload
    })
    builder.addCase(fetchPokemons.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchPokemons.rejected, (state) => {
      state.loading = false
      state.error = true
    })
  },
})

export const pokemonListReducer = pokemonListSlice.reducer
export const {changePage} = pokemonListSlice.actions
