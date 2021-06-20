import axios from "axios"

// Constates
const dataInicial = {
    array: [],
    offset: 0
}

// Types
const GET_POKEMONES_EXITO = 'GET_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'

// Reducer
export default function pokeReducer(state = dataInicial, action){
    switch (action.type) {
        case GET_POKEMONES_EXITO:
            return {...state, array: action.payload}
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, array: action.payload.array, offset: action.payload.offset}
        default:
            return state
    }
}

// Acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    // console.log(getState().pokemones.offset)
    const offset = getState().pokemones.offset

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        dispatch({
            type: GET_POKEMONES_EXITO,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemonAccion = () => async(dispatch, getState) => {

    // Primer alternativa
    const offset = getState().pokemones.offset
    const siguiente = offset + 20

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: {
                array: res.data.results,
                offset: siguiente
            }
        })
    } catch (error) {
        console.log(error)
    }
}