import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './reducers/currencyReducer';
import categoriesReducer from './reducers/categoriesReducer';
import cartReducer from './reducers/cartReducer';

export default configureStore({
  reducer: {
    currency: currencyReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
});
