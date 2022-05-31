import cartConstants from '../constants/cart.constants';

export const addToCart = (payload) => ({
  type: cartConstants.ADD_TO_CART,
  payload,
});

export const removeFromCart = (payload) => ({
  type: cartConstants.REMOVE_FROM_CART,
  payload,
});

export const incrementAmount = (payload) => ({
  type: cartConstants.INCREMENT_AMOUNT,
  payload,
});

export const decrementAmount = (payload) => ({
  type: cartConstants.DECREMENT_AMOUNT,
  payload,
});

export const changeAttribute = (payload) => ({
  type: cartConstants.CHANGE_ATTRIBUTE,
  payload,
});
