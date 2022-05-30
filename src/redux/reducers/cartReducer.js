import cartConstants from '../constants/cart.constants';

const initialState = {
  cart: [],
};

function checkDuplicateProduct(state, action) {
  const duplicateFilter = state.cart.filter((product) => (
    product.id === action.payload.id
  ));
  const cartWithoutDuplicate = state.cart.filter((product) => (
    product.id !== action.payload.id
  ));
  if (duplicateFilter.length) {
    const newAmount = { amount: duplicateFilter[0].amount + 1 };
    const newProduct = { ...duplicateFilter[0], ...newAmount };
    return {
      ...state,
      cart: [...cartWithoutDuplicate, newProduct],
    };
  }
  return {
    ...state,
    cart: [...state.cart, action.payload],
  };
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      return checkDuplicateProduct(state, action);
    default:
      return state;
  }
};

export default cartReducer;
