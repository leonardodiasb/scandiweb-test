import cartConstants from '../constants/cart.constants';
import {
  addProduct, decrement, editAttribute, increment, removeProduct,
} from '../helpers/cart.utils';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      return addProduct(state, action);
    case cartConstants.CHANGE_ATTRIBUTE:
      return editAttribute(state, action);
    case cartConstants.INCREMENT_AMOUNT:
      return increment(state, action);
    case cartConstants.DECREMENT_AMOUNT:
      return decrement(state, action);
    case cartConstants.REMOVE_FROM_CART:
      return removeProduct(state, action);
    default:
      return state;
  }
};

export default cartReducer;
