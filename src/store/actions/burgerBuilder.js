import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngrediant = (name)=>{
    return {
        type:actionTypes.ADD_INGREDIANTS,
        ingrediantName:name
    }
}
export const removeIngrediant = (name)=>{
    return {
        type:actionTypes.REMOVE_INGREDIANTS,
        ingrediantName:name
    }
}
export const setIngrediants = (ingrediants) =>{
    return{
        type:actionTypes.SET_INGREDIANTS,
        ingrediants:ingrediants
    }

}
export const fetchIngrediantsFailed = () =>{
    return{
        type:actionTypes.FETCH_INGREDIANTS_FAILED
    }

}

export const inintIngrediants = ()=>{
    return dispatch=>{
        axios.get('https://react-burger-e554c.firebaseio.com/ingrediants.json')
    .then(response=>{
        dispatch(setIngrediants(response.data))
    }).catch(error=>{
        dispatch(fetchIngrediantsFailed())

    })

    }
}