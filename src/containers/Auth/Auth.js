import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


class Auth extends Component{

    state = {
        controls:{
            email: {
                elementType: "input",
                elementConfig: {
                  type: "email",
                  placeholder: "Mail Adderess",
                },
                value: "",
                Validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
              },
              password: {
                elementType: "input",
                elementConfig: {
                  type: "password",
                  placeholder: "Password",
                },
                value: "",
                Validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
              },

        },
        isSignup:true
    }
    componentDidMount(){
        if (!this.props.isbuildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()
        }

    }
    checkValidity(value,rules){
        let isValid = true;
        if (rules.required){
           isValid = value.trim() !== '' && isValid;
        }
       if (rules.minLength){
         isValid = value.length >= rules.minLength && isValid;
      }
        if (rules.maxLength){
           isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
       return isValid
    }
    inputChangedhandler = (event,controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value : event.target.value,
                touched : true,
                valid : this.checkValidity(event.target.value,this.state.controls[controlName].Validation)
            }
        }
        
      this.setState({controls:updatedControls});
  
    }
    onSubmitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }
    switchAuthModeHandler = ()=>{
        this.setState(prevState =>{
            return{
                isSignup:!prevState.isSignup
            }
        })
    }
    render(){
        const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => {
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
            })

            if (this.props.loading){
                form = <Spinner />
            }
            let errorMsg = null;
            if (this.props.error) {
              errorMsg = <p>{this.props.error.message}</p>;
            }
            let authRedirect = null
            if (this.props.isAuthenticated){
                authRedirect = <Redirect to={this.props.authRedirectPath}/>

            }


    return (
      <div className="Auth">
          {authRedirect}
          {errorMsg}
        <h4>Sign in/Sign Up</h4>
        <form onSubmit={this.onSubmitHandler}>
        {form}
        <Button  btnType="Success"  >
          SUBMIT
         </Button>

        </form>
        <Button  btnType="Danger" clicked={this.switchAuthModeHandler}  >
          SWITCH TO {this.state.isSignup ? 'SIGNIN':'SIGNUP'}
         </Button>
      </div>
    )
  }
}

const mapStateToProps = state =>{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated : state.auth.token !== null,
        isbuildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onAuth : (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
    

export default connect(mapStateToProps,mapDispatchToProps)(Auth);