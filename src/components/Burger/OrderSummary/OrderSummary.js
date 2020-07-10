import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from '../../UI/Button/Button'

const OrderSummary = props => {

    //this could be a functional component,doent to be a class
    
  const ingrediantSummary = Object.keys(props.ingrediants)
  .map(igkey => {
    return (
      <li key={igkey}>
        <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
        {props.ingrediants[igkey]}
      </li>
      ); 
  });


  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingrediants:</p>
      <ul>{ingrediantSummary}</ul>
  <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchageCancel}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchageContinued} >CONTUNUE</Button>
    </Aux>
  );

}

export default OrderSummary;
