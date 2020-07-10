import * as actionTypes from '../actions/actionTypes';
import { logoutSaga,checkAuthTimeoutSaga,authUserSaga,authCheckStateSaga } from './auth';
import { initIngrediantsSaga } from './burgerBuilder';
import { purchageBurgerSaga,fetchOrdersSaga } from './order'
import {takeEvery,all,takeLatest} from 'redux-saga/effects'
export function* watchAuth(){
    yield all([takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga),
     takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga),
     takeEvery(actionTypes.AUTH_USER,authUserSaga),
     takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE,authCheckStateSaga) 
    ]) 
}
export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIANTS,initIngrediantsSaga) 
}
export function* watchOrders(){
    yield takeLatest(actionTypes.PURCHASE_BURGER,purchageBurgerSaga) 
    yield takeEvery(actionTypes.FETCH_ORDERS,fetchOrdersSaga)  
 
}