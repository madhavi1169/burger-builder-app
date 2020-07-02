import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import { connect} from 'react-redux';
import * as actions from '../../store/actions/index';



export class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  //     this.state = {}
  // }
  state = {
    purchasing: false,
  };

  // shouldComponentUpdate(nextprops,nextstate){
  //   return nextprops.show != this.props.show || nextprops.children != this.props.children
  // }

  componentDidMount(){
    // axios.get('https://react-burger-e554c.firebaseio.com/ingrediants.json')
    // .then(response=>{
    //   this.setState({ingrediants:response.data})
    // }).catch(error=>{
    //   this.setState({error:true})
    // })

    this.props.onInitIngrediants();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated){
      this.setState({ purchasing: true });
    }else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };
  updatePurchaseState(ingrediants) {
    const sum = Object.keys(ingrediants)
      .map((igkey) => {
        return ingrediants[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // this.setState({ purchasable: sum > 0 });
    return  sum > 0;
  }
  addIngrediantHandler = (type) => {
    // const oldCount = this.props.ings[type];
    // const updateCount = oldCount + 1;
    // const updateIngrediants = {
    //   ...this.props.ings,
    // };
    // updateIngrediants[type] = updateCount;
    // const priceAddition = INGREDIANT_PRICE[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice + priceAddition;
    // this.setState({ totalPrice: newPrice, ingrediants: updateIngrediants });
    // this.updatePurchaseState(updateIngrediants);
  };
  removeIngrediantHandler = (type) => {
    // const oldCount = this.props.ings[type];
    // if (oldCount <= 0) {
    //   return;
    // }

    // const updateCount = oldCount - 1;
    // const updateIngrediants = {
    //   ...this.props.ings,
    // };
    // updateIngrediants[type] = updateCount;
    // const priceAddition = INGREDIANT_PRICE[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice - priceAddition;
    // this.setState({ totalPrice: newPrice, ingrediants: updateIngrediants });
    // this.updatePurchaseState(updateIngrediants);
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // const queryParams =[];
    // for (let i in this.props.ings){
    //   queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.props.ings[i]))
    // }
    // queryParams.push('price='+this.props.price)
    // const queryString = queryParams.join('&');

    // this.props.history.push({
    //   pathname:'/checkout',
    //   search:'?'+queryString} );
    this.props.onInitPurchase();
    this.props.history.push('/checkout');

 
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    
    let burger =  this.props.error ? <p>Sorry!...Ingrediants not loaded!</p> :<Spinner/>
    if (this.props.ings){
      orderSummary =  <OrderSummary
    ingrediants={this.props.ings}
    purchageCancel={this.purchaseCancelHandler}
    purchageContinued={this.purchaseContinueHandler}
    price={this.props.price}
  />
     burger = (<Aux><Burger ingrediants={this.props.ings} />
    <BuildControls
      ingrediantAdded={this.props.onIngrediantAdded}
      ingrediantRemoved={this.props.onIngrediantRemoved}
      disabled={disabledInfo}
      price={this.props.price}
      purchasable={this.updatePurchaseState(this.props.ings)}
      ordered={this.purchaseHandler}
      isAuth={this.props.isAuthenticated}
    /></Aux>)
   
  }
  
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
         {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings:state.burgerBuilder.ingrediants,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuthenticated:state.auth.token !== null

  }
}
const mapDispatchToProps = dispatch =>{
  return {
    onIngrediantAdded: (ingName)=>dispatch(actions.addIngrediant(ingName)),
    onIngrediantRemoved: (ingName)=>dispatch(actions.removeIngrediant(ingName)),
    onInitIngrediants:()=>dispatch(actions.inintIngrediants()),
    onInitPurchase:() => dispatch(actions.purchageInit()),
    onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
