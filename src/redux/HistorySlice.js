import { createSlice } from '@reduxjs/toolkit';

const HistorySlice = createSlice({
  name: 'history',
  initialState: {
    itemsHistory: [],
    quantity: 0,
  },
  reducers: {
    AddHistory: (state, action) => {
      state.itemsHistory.push(action.payload);
    },
    clearHistory: (state) => {
      state.itemsHistory = [];
    },
  },
});

export const { AddHistory, clearHistory } = HistorySlice.actions;
export default HistorySlice.reducer;
