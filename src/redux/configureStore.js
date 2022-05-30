import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './reducers/currencyReducer';
import categoriesReducer from './reducers/categoriesReducer';
import cartReducer from './reducers/cartReducer';
import productsReducer from './reducers/productsReducer';

export default configureStore({
  reducer: {
    currency: currencyReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});
