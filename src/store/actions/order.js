import * as actionTypes from './actionTypes';
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
    return {
        type:actionTypes.PURCHASE_BURGER,
        orderData:orderData,
        token:token

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
    return {
        type:actionTypes.FETCH_ORDERS,
        token:token,
        userId:userId
    }  
}
