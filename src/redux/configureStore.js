import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './reducers/currencyReducer';

export default configureStore({
  reducer: {
    currency: currencyReducer,
  },
});
