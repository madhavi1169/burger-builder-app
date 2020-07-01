import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchageBurgerSuccess =(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCESS,
        orderId:id,
        orderData:orderData
    }

}
export const purchageBurgerFail =(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }

}

export const purchageBurger = (orderData,token)=>{
    return dispatch=>{
        dispatch(purchageBurgerStart());
        axios
        .post("/orders.json?auth="+token, orderData)
        .then((response) => {
          dispatch(purchageBurgerSuccess(response.data.name,orderData))
        })
        .catch((error) => {
            dispatch(purchageBurgerFail(error))
        });    
    }
}
export const purchageBurgerStart =()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }

}
export const purchageInit =()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }

}

export const fetchOrdersSuccess =(orders)=>{
    return {
        type:actionTypes.FETCH_ORDERS_SUCESS,
        orders:orders
    } 
}
export const fetchOrdersFail = (error) =>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }

}
export const fetchOrdersStart =()=>{
    return {
        type:actionTypes.FETCH_ORDERS_START,
    }

}
export const  fetchOrders = (token,userId) =>{
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+ userId+'"';
        axios.get('/orders.json'+ queryParams)
        .then(res=>{
            let fetchedOrders=[];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key})
            }
            // this.setState({loading:false,orders:fetchedOrders})
            dispatch(fetchOrdersSuccess(fetchedOrders))
    
        })
        .catch(error=>{
            dispatch(fetchOrdersFail(error))
    
        })
    }
    
}
