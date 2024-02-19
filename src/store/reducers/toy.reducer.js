import { toyService } from "../../services/toy.service.js"


// toy
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

// shopping cart
/*export const SET_CART_IS_SHOWN = 'SET_CART_IS_SHOWN'
export const ADD_CAR_TO_CART = 'ADD_CAR_TO_CART'
export const REMOVE_CAR_FROM_CART = 'REMOVE_CAR_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'*/

export const SET_IS_LOADING = 'SET_IS_LOADING'


export const SET_FILTER_BY = 'SET_FILTER_BY'

export const GET_LABELS='GET_LABELS'

const initialState = {
    toys: [],
    lastToys: [],
    //isCartShown: false,
    //shoppingCart: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 
    'Outdoor', 'Battery Powered']
}

export function toyReducer(state = initialState, action = {}) {

    let toys
    //let shoppingCart
    let lastToys
    switch (action.type) {
        // toy
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            lastToys = [...state.toys]
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastToys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }


        case GET_LABELS:
            return {...state,labels}


        // shopping cart
        /*case SET_CART_IS_SHOWN:
            return { ...state, isCartShown: action.isCartShown }

        case ADD_CAR_TO_CART:
            shoppingCart = [...state.shoppingCart, action.car]
            return { ...state, shoppingCart }

        case ADD_CAR_TO_CART:
            shoppingCart = [...state.shoppingCart, action.car]
            return { ...state, shoppingCart }

        case REMOVE_CAR_FROM_CART:
            shoppingCart = state.shoppingCart.filter(car => car._id !== action.carId)
            return { ...state, shoppingCart }
        case CLEAR_CART:
            return { ...state, shoppingCart: [] }
*/

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case TOY_UNDO:
            toys = [...state.lastToys]
            return { ...state, toys }

        default:
            return state
    }
}
