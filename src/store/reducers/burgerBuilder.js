import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const INGREDIANT_PRICE = {
  salad: 0.5,
  bacon: 0.4,
  meat: 0.7,
  cheese: 1.3,
};

const initialState = {
  ingrediants: null,
  totalPrice: 4,
  error: false,
  building:false
};
const addIngrediant = (state, action) => {
  const updatedIngrediant = {
    [action.ingrediantName]: state.ingrediants[action.ingrediantName] + 1,
  };
  const updatedIngrediants = updateObject(state.ingrediants, updatedIngrediant);
  const updatedState = {
    ingrediants: updatedIngrediants,
    totalPrice: state.totalPrice + INGREDIANT_PRICE[action.ingrediantName],
    building:true
  };
  return updateObject(state, updatedState);
};
const removeIngrediant = (state, action) => {
  const updatedIngrediant = {
    [action.ingrediantName]: state.ingrediants[action.ingrediantName] - 1,
  };
  const updatedIngrediants = updateObject(state.ingrediants, updatedIngrediant);
  const updatedState = {
    ingrediants: updatedIngrediants,
    totalPrice: state.totalPrice - INGREDIANT_PRICE[action.ingrediantName],
    building:true
  };
  return updateObject(state, updatedState);
};
const setIngrediant = (state, action) => {
  const updateState = {
    ingrediants: {
      salad: action.ingrediants.salad,
      bacon: action.ingrediants.bacon,
      cheese: action.ingrediants.cheese,
      meat: action.ingrediants.meat,
    },
    totalPrice: 4,
    error: false,
    building:false
  };

  return updateObject(state, updateState);
};
const fetchIngrediantFailed = (state,action)=>{
  return updateObject(state, { error: true });

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIANTS:return addIngrediant(state, action);
    case actionTypes.REMOVE_INGREDIANTS:return removeIngrediant(state, action);

      // return {
      //   ...state,
      //   ingrediants: {
      //     ...state.ingrediants,
      //     [action.ingrediantName]: state.ingrediants[action.ingrediantName] - 1,
      //   },
      //   totalPrice: state.totalPrice - INGREDIANT_PRICE[action.ingrediantName],
      // };


    case actionTypes.SET_INGREDIANTS:return setIngrediant(state, action);
    case actionTypes.FETCH_INGREDIANTS_FAILED: return fetchIngrediantFailed(state,action);
      
    default:
      return state;
  }
};
export default reducer;
