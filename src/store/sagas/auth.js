import {put,delay,call} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action){
    yield call([localStorage,'removeItem'],'token')
    yield call([localStorage,'removeItem'],'expirationDate')
    yield call([localStorage,'removeItem'],'userId')
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expireTime*1000)
    yield put(actions.logout())

}
export function* authUserSaga(action){
    yield put(actions.authStart())
        const authData = {
            email:action.email,
            password:action.password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCw2QY9UP4fuwR8YhGQAuDOEkhXvcWgA3s'
        if (!action.isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCw2QY9UP4fuwR8YhGQAuDOEkhXvcWgA3s'
        }
        try{
            const response = yield axios.post(url,authData)
            const expirationDate = yield new Date((new Date().getTime()) + response.data.expiresIn * 1000);
            yield localStorage.setItem('token',response.data.idToken);
            yield localStorage.setItem('expirationDate',expirationDate);
            yield localStorage.setItem('userId',response.data.localId);
            yield put(actions.authSuccess(response.data.idToken,response.data.localId))
            yield put(actions.checkAuthTimeOut(response.data.expiresIn));
        }catch(error){
            yield put(actions.authFail(error.response.data.error))
        }
}
export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
        const userId = yield localStorage.getItem('userId');
        if (!token){
            yield put(actions.logout());
        }
        else {
            const expDate = yield new Date (localStorage.getItem('expirationDate'));
            if (expDate <= new Date()){
                yield put(actions.logout());
            }
            else{
                yield put(actions.authSuccess(token,userId));
                yield put(actions.checkAuthTimeOut((expDate.getTime() - (new Date().getTime())) / 1000));
            }
        }

}