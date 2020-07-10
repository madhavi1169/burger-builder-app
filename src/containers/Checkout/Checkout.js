import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index'

const Checkout = props =>{
    
    // componentWillMount(){
        // const query = new URLSearchParams(this.props.location.search);
        // const ingrediants = {}
        // let price = 0;
        // console.log(query)
        // for (let param of query.entries()){
        //     console.log(param)
        //     if (param[0] === 'price'){
        //         price = param[1];
        //     }else{
        //     ingrediants[param[0]] = +param[1];
        // }
        // }
        // this.setState({ingrediants:ingrediants,totalPrice:price})
        // this.props.onInitPurchage()

    // }
    
    const checkoutCancelledHandler=()=>{
        props.history.goBack();

    }
    const checkoutContinuedHandler=()=>{
        props.history.replace('/checkout/contact-data');

    }

        let summary = <Redirect to="/" />
        if (props.ings){
            const purchasedRedirect =  props.purchased ? <Redirect to='/'/> :  null 
            summary = 
            <div>
                {purchasedRedirect}
            <CheckoutSummary  ingrediants={props.ings}
            oncheckoutContinued={checkoutContinuedHandler}
             oncheckoutCancelled={checkoutCancelledHandler}/>
             <Route path={props.match.path+'/contact-data'}
             component={ContactData} />
             </div>
        }

        return (
        <div>
            {summary}
            
        </div>
        )
    

}
const mapStateToProp = state => {
    return{
        ings:state.burgerBuilder.ingrediants,
        price:state.burgerBuilder.totalPrice,
        purchased:state.order.purchased

    }
}
const mapDispatchToProp = dispatch =>{
    return{
        onInitPurchage:()=>dispatch(action.purchageInit())
    }

}



export default connect(mapStateToProp,mapDispatchToProp)(Checkout);