import axios from "axios"

// Constates
const dataInicial = {
    array: []
}

// Types
const GET_POKEMONES_EXITO = 'GET_POKEMONES_EXITO'

// Reducer
export default function pokeReducer(state = dataInicial, action){
    switch (action.type) {
        case GET_POKEMONES_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

// Acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        dispatch({
            type: GET_POKEMONES_EXITO,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}