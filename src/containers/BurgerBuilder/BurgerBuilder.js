import React, { useEffect,useState ,useCallback} from "react";
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
import {useDispatch,useSelector} from 'react-redux'



export const BurgerBuilder = props => {
  // constructor(props){
  //     super(props);
  //     this.state = {}
  // }
  // state = {
  //   purchasing: false,
  // };
  const [purchasing,setpurchasing] = useState(false);
  const ings = useSelector(state =>{
      return state.burgerBuilder.ingrediants
  })
  const price = useSelector(state =>{
    return state.burgerBuilder.totalPrice
  })
  const error = useSelector(state =>{
    return state.burgerBuilder.error
  })
  const isAuthenticated = useSelector(state =>{
    return state.auth.token !== null
  })


  const dispatch = useDispatch();
  const onIngrediantAdded = (ingName)=>dispatch(actions.addIngrediant(ingName));
    const onIngrediantRemoved = (ingName)=>dispatch(actions.removeIngrediant(ingName));
   const  onInitIngrediants = useCallback(()=>dispatch(actions.inintIngrediants()),[]);
    const onInitPurchase = () => dispatch(actions.purchageInit());
    const onSetAuthRedirectPath = (path)=>dispatch(actions.setAuthRedirectPath(path));

  // shouldComponentUpdate(nextprops,nextstate){
  //   return nextprops.show != this.props.show || nextprops.children != this.props.children
  // }

  useEffect(()=>{
    // axios.get('https://react-burger-e554c.firebaseio.com/ingrediants.json')
    // .then(response=>{
    //   this.setState({ingrediants:response.data})
    // }).catch(error=>{
    //   this.setState({error:true})
    // })

    onInitIngrediants();
  },[onInitIngrediants])

  const purchaseHandler = () => {
    if (isAuthenticated){
      // this.setState({ purchasing: true });
      setpurchasing(true)
    }else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };
  const updatePurchaseState =(ingrediants)=> {
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
  const addIngrediantHandler = (type) => {
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
  const removeIngrediantHandler = (type) => {
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
  const purchaseCancelHandler = () => {
    // this.setState({ purchasing: false });
    setpurchasing(false)
  };
 const purchaseContinueHandler = () => {
    // const queryParams =[];
    // for (let i in this.props.ings){
    //   queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.props.ings[i]))
    // }
    // queryParams.push('price='+this.props.price)
    // const queryString = queryParams.join('&');

    // this.props.history.push({
    //   pathname:'/checkout',
    //   search:'?'+queryString} );
    onInitPurchase();
    props.history.push('/checkout');

 
  };

    const disabledInfo = {
      ...ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    
    let burger =  error ? <p>Sorry!...Ingrediants not loaded!</p> :<Spinner/>
    if (ings){
      orderSummary =  <OrderSummary
    ingrediants={ings}
    purchageCancel={purchaseCancelHandler}
    purchageContinued={purchaseContinueHandler}
    price={price}
  />
     burger = (<Aux><Burger ingrediants={ings} />
    <BuildControls
      ingrediantAdded={onIngrediantAdded}
      ingrediantRemoved={onIngrediantRemoved}
      disabled={disabledInfo}
      price={price}
      purchasable={updatePurchaseState(ings)}
      ordered={purchaseHandler}
      isAuth={isAuthenticated}
    /></Aux>)
   
  }
  
    return (
      <Aux>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
         {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  
}

export default withErrorHandler(BurgerBuilder,axios);
