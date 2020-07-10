import React, { useEffect,useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {updateObject,checkValidity } from '../../shared/utility';


const Auth = props => {
    const [controls,setControls] = useState( {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Adderess",
        },
        value: "",
        Validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        Validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    })
    const [isSignup,setIsSignup] = useState(true)
    const {onSetAuthRedirectPath,isbuildingBurger,authRedirectPath } = props

  useEffect(()=> {
    if (isbuildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  },[onSetAuthRedirectPath,isbuildingBurger,authRedirectPath])
  
  const inputChangedhandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          controls[controlName].Validation
        ),
      }),
    });

    // this.setState({ controls: updatedControls });
    setControls(updatedControls)
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignup
    );
  };
  const switchAuthModeHandler = () => {
    // this.setState((prevState) => {
    //   return {
    //     isSignup: !prevState.isSignup,
    //   };
    // });
    setIsSignup(!isSignup)
  };
    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
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
          shouldValidateData={formElement.config.Validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedhandler(event, formElement.id)}
        />
      );
    });

    if (props.loading) {
      form = <Spinner />;
    }
    let errorMsg = null;
    if (props.error) {
      errorMsg = <p>{props.error.message}</p>;
    }
    let authRedirect = null;
    if (props.isAuthenticated) {
      authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    return (
      <div className="Auth">
        {authRedirect}
        {errorMsg}
        <h4>Sign in/Sign Up</h4>
        <form onSubmit={onSubmitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={switchAuthModeHandler}>
          SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  
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