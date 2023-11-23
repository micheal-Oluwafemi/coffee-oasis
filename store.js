import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './src/redux/CartSlice';
import FavoriteReducer from './src/redux/FavoriteSlice';
import HistoryReducer from './src/redux/HistorySlice';

const store = configureStore({
  reducer: {
    cart: CartReducer,
    favorite: FavoriteReducer,
    history: HistoryReducer,
  },
});

export default store;
