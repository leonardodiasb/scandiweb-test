import cartConstants from '../constants/cart.constants';

const addToCart = (payload) => ({
  type: cartConstants.ADD_TO_CART,
  payload,
});

const removeFromCart = (payload) => ({
  type: cartConstants.REMOVE_FROM_CART,
  payload,
});

const incrementAmount = () => ({
  type: cartConstants.INCREMENT_AMOUNT,
});

const decrementAmount = () => ({
  type: cartConstants.DECREMENT_AMOUNT,
});

const changeAttribute = (payload) => ({
  type: cartConstants.CHANGE_ATTRIBUTE,
  payload,
});

export default {
  addToCart, removeFromCart, incrementAmount, decrementAmount, changeAttribute,
};
