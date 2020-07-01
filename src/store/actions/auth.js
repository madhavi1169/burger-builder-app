import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = ()=>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSuccess = (token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}
export const authFail = (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const logout =()=>{
    localStorage.removeItem('token');
     localStorage.removeItem('expirationDate');
     localStorage.removeItem('userId');

    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expireTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expireTime*1000)
    }

}
export const auth = (email,password,isSignup)=>{
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCw2QY9UP4fuwR8YhGQAuDOEkhXvcWgA3s'
        if (!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCw2QY9UP4fuwR8YhGQAuDOEkhXvcWgA3s'
        }
        axios.post(url,authData)
        .then(response =>{
            console.log(response);
            const expirationDate = new Date((new Date().getTime()) + response.data.expiresIn * 1000);
            localStorage.setItem('token',response.data.idToken);
            
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);

            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkAuthTimeOut(response.data.expiresIn));
        })
        .catch(err =>{
            console.log(err)
            dispatch(authFail(err.response.data.error))
        })

    }
}
export const setAuthRedirectPath = (path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}
export const authCheckState = ()=>{
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token){
            dispatch(logout());
        }
        else {
            const expDate = new Date (localStorage.getItem('expirationDate'));
            if (expDate <= new Date()){
                dispatch(logout());
            }
            else{
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeOut((expDate.getTime() - (new Date().getTime())) / 1000));
            }
        }
    }
}