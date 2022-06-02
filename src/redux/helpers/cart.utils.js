const updateObject = (oldObject, newValues) => ({ ...oldObject, ...newValues });

const updateItemInArray = (array, itemId, updateItemCallback) => {
  const updatedItems = array.map((item) => {
    if (item.id !== itemId) {
      return item;
    }

    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
};

const filterObject = (arr, id) => arr.filter((product) => (
  product.id === id
))[0];

export const increment = (state, action) => {
  const filtered = filterObject(state.cart, action.payload.id);
  const newAmount = { amount: filtered.amount + 1 };
  const newCartState = updateItemInArray(state.cart, action.payload.id, (i) => (
    updateObject(i, newAmount)
  ));
  return {
    ...state,
    cart: [...newCartState],
  };
};

export const decrement = (state, action) => {
  const filtered = filterObject(state.cart, action.payload.id);
  const newAmount = { amount: filtered.amount - 1 };
  const newCartState = updateItemInArray(state.cart, action.payload.id, (i) => (
    updateObject(i, newAmount)
  ));
  return {
    ...state,
    cart: [...newCartState],
  };
};

export const addProduct = (state, action) => {
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
};

export const removeProduct = (state, action) => {
  const newCartState = state.cart.filter((product) => product.id !== action.payload.id);
  return {
    ...state,
    cart: [...newCartState],
  };
};
