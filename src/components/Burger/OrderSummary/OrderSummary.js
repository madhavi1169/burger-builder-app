import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{

    //this could be a functional component,doent to be a class
    componentWillUpdate(){
    }
    render(){
  const ingrediantSummary = Object.keys(this.props.ingrediants)
  .map(igkey => {
    return (
      <li key={igkey}>
        <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
        {this.props.ingrediants[igkey]}
      </li>
      ); 
  });


  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingrediants:</p>
      <ul>{ingrediantSummary}</ul>
  <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={this.props.purchageCancel}>CANCEL</Button>
      <Button btnType="Success" clicked={this.props.purchageContinued} >CONTUNUE</Button>
    </Aux>
  );
};
}

export default OrderSummary;
