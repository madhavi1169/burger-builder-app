import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkValidity } from '../../../shared/utility';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        Validation:{
            required:true
        },
        valid:false,
        touched:false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        Validation:{
            required:true
        },
        valid:false,
        touched:false


      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        Validation:{
            required:true,
            minLength:6,
            maxLength:6
        },
        valid:false,
        touched:false


      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        Validation:{
            required:true
        },
        valid:false,
        touched:false


      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        Validation:{
            required:true
        },
        valid:false,
        touched:false


      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", dispalyValue: "fastest" },
            { value: "cheapest", dispalyValue: "cheapest" },
          ],
        },
        value: "fastest",
        valid:true,
        Validation:{}


      },
    },
    formIsValid:false,

  };
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm){
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

    }
    const order = {
      ingrediants:this.props.ings,
      price:this.props.price,
      orderData:formData,
      userId:this.props.userId
    }
    this.props.onOrderBurger(order,this.props.token);
    
    
  };

  inputChangedhandler = (event,inputIdentifier)=>{
    
      const updatedOrderFormElement = updateObject(this.state.orderForm[inputIdentifier], {
          value : event.target.value,
          touched : true,
          valid : checkValidity(event.target.value,this.state.orderForm[inputIdentifier].Validation)

    })
    const updatedOrderForm = updateObject(this.state.orderForm,{[inputIdentifier]:updatedOrderFormElement})
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
    let  formvalid = true;
    for (let inputIndetifier in updatedOrderForm){
         formvalid = updatedOrderForm[inputIndetifier].valid && formvalid;
    }
    
    this.setState({orderForm:updatedOrderForm,formIsValid:formvalid});

  }
  
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
                key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidateData = {formElement.config.Validation}
              touched = {formElement.config.touched}
              changed={(event)=>this.inputChangedhandler(event,formElement.id)}
            />
          );
        })}

        <Button  disabled={!this.state.formIsValid} btnType="Success"  >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Enter your Contact details</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProp = state => {
  return{
      ings:state.burgerBuilder.ingrediants,
      price:state.burgerBuilder.totalPrice,
      loading:state.order.loading,
      token:state.auth.token,
      userId:state.auth.userId
  }
}
const mapDispatchToProp = dispatch =>{
  return{
    onOrderBurger:(orderData,token)=>dispatch(actions.purchageBurger(orderData,token))

  }

}
export default connect(mapStateToProp,mapDispatchToProp)(withErrorHandler(ContactData,axios));
