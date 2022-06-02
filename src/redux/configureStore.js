import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import currencyReducer from './reducers/currencyReducer';
import categoriesReducer from './reducers/categoriesReducer';
import cartReducer from './reducers/cartReducer';
import productsReducer from './reducers/productsReducer';

const reducers = combineReducers({
  currency: currencyReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  products: productsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;

// export default configureStore({
//   reducer: {
//     currency: currencyReducer,
//     categories: categoriesReducer,
//     cart: cartReducer,
//     products: productsReducer,
//   },
// });
