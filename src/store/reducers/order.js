import * as actionTpes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};
const purchaseBurgerFailed = (state, action) => {
  return updateObject(state, { loading: false });
};
const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const purchaseBurgerIntialized = (state, action) => {
  return updateObject(state, { purchased: false });
};
const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};
const fetchOrdersFailed = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTpes.PURCHASE_BURGER_SUCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTpes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFailed(state, action);

    case actionTpes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTpes.PURCHASE_INIT:
      return purchaseBurgerIntialized(state, action);

    case actionTpes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    case actionTpes.FETCH_ORDERS_SUCESS:
      return fetchOrdersSuccess(state, action);

    case actionTpes.FETCH_ORDERS_FAIL:
      return fetchOrdersFailed(state, action);

    default:
      return state;
  }
};
export default reducer;
