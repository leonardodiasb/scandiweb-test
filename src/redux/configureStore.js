import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './reducers/currencyReducer';
import categoriesReducer from './reducers/categoriesReducer';

export default configureStore({
  reducer: {
    currency: currencyReducer,
    categories: categoriesReducer,
  },
});
