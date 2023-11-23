import { createSlice } from '@reduxjs/toolkit';

const FavoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    items: [],
    quantity: 0,
  },
  reducers: {
    AddFavorite: (state, action) => {
      const find = state.items.findIndex((pre) => pre.id === action.payload.id);
      if (find >= 0) {
        state.items[find].quantity += 1;
      } else {
        const tempVar = { ...action.payload, quantity: 1 };
        state.items.push(tempVar);
      }
    },
    remove: (state, action) => {
      state.items = state.items.filter((itm) => itm.id !== action.payload);
    },
  },
});

export const { AddFavorite, remove } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
