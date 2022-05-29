import cartConstants from '../constants/cart.constants';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.cart],
      };
    default:
      return state;
  }
};

export default cartReducer;
