import cartConstants from '../constants/cart.constants';

const initialState = {
  cart: [],
};

function updateObject(oldObject, newValues) {
  return { ...oldObject, ...newValues };
}

function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map((item) => {
    if (item.id !== itemId) {
      return item;
    }

    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
}

function filterObject(arr, id) {
  return arr.filter((product) => (
    product.id === id
  ))[0];
}

function increment(state, action) {
  const filtered = filterObject(state.cart, action.payload.id);
  const newAmount = { amount: filtered.amount + 1 };
  const newCartState = updateItemInArray(state.cart, action.payload.id, (i) => (
    updateObject(i, newAmount)
  ));
  return {
    ...state,
    cart: [...newCartState],
  };
}

function decrement(state, action) {
  const filtered = filterObject(state.cart, action.payload.id);
  const newAmount = { amount: filtered.amount - 1 };
  const newCartState = updateItemInArray(state.cart, action.payload.id, (i) => (
    updateObject(i, newAmount)
  ));
  return {
    ...state,
    cart: [...newCartState],
  };
}

function editAttribute(state, action) {
  updateItemInArray(
    action.payload.productAttributes, action.payload.newAttribute.id, (i) => (
      updateObject(i, action.payload.newAttribute)),
  );
  const newAttributes = {
    attributes: updateItemInArray(
      action.payload.productAttributes, action.payload.newAttribute.id, (i) => (
        updateObject(i, action.payload.newAttribute)),
    ),
  };
  const newCartState = updateItemInArray(state.cart, action.payload.productId, (i) => (
    updateObject(i, newAttributes)
  ));

  return {
    ...state,
    cart: [...newCartState],
  };
}

function addProduct(state, action) {
  const duplicateProduct = filterObject(state.cart, action.payload.id);
  if (duplicateProduct) {
    const newAmount = { amount: duplicateProduct.amount + 1 };
    const newProduct = updateObject(duplicateProduct, newAmount);

    const newCartState = updateItemInArray(state.cart, action.payload.id, (i) => (
      updateObject(i, newProduct)
    ));
    return {
      ...state,
      cart: [...newCartState],
    };
  }
  return {
    ...state,
    cart: [...state.cart, action.payload],
  };
}

function removeProduct(state, action) {
  const newCartState = state.cart.filter((product) => product.id !== action.payload.id);
  return {
    ...state,
    cart: [...newCartState],
  };
}

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
