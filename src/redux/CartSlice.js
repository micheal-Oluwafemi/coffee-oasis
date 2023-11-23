import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    item: [],
    totalAmount: 0,
    totalCount: 0,
    quantity: 0,
    // historyTotalItem: 0,
  },
  reducers: {
    AddCart: (state, action) => {
      const find = state.item.findIndex((pre) => pre.id === action.payload.id);
      if (find >= 0) {
        state.item[find].quantity += 1;
      } else {
        const tempVar = { ...action.payload, quantity: 1 };
        state.item.push(tempVar);
      }
    },

    getCartTotal: (state) => {
      let { totalAmount, totalCount } = state.item.reduce(
        (cartTotal, cartItem) => {
          const { prices, amount } = cartItem;
          const itemTotal = prices * amount;
          cartTotal.totalAmount += itemTotal;
          cartTotal.totalCount += amount;
          return cartTotal;
        },
        { totalAmount: 0, totalCount: 0 }
      );
      state.totalAmount = totalAmount.toFixed(2);
      state.totalCount = totalCount;
    },
    remove: (state, action) => {
      state.item = state.item.filter((itm) => itm.id !== action.payload);
    },

    increase: (state, action) => {
      state.item = state.item.map((itm) => {
        if (itm.id === action.payload) {
          return { ...itm, amount: itm.amount + 1 };
        }
        return itm;
      });
    },
    decrease: (state, action) => {
      state.item = state.item
        .map((itm) => {
          if (itm.id === action.payload) {
            return { ...itm, amount: itm.amount - 1 };
          }
          return itm;
        })
        .filter((itm) => itm.amount !== 0);
    },
    clearCart: (state) => {
      state.item = [];
    },
  },
});
export const { AddCart, increase, getCartTotal, remove, decrease, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
