import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';
export function* initIngrediantsSaga(action){
    try{
    const response = yield axios.get('https://react-burger-e554c.firebaseio.com/ingrediants.json')
    yield put(actions.setIngrediants(response.data))
    }catch(error){
        yield put(actions.fetchIngrediantsFailed())
    }

}