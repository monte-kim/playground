import { createSlice } from "@reduxjs/toolkit";

let items = createSlice({
  name: "Items",
  initialState: [
    { id: 0, company: "Mala", count: 2 },
    { id: 1, company: "Crayola", count: 1 },
  ],
  reducers: {
    addCart(state, action) {
      state.push(action.payload);
    },
    addCount(state, action) {
      let item = state.findIndex((item) => {
        return item.id === action.payload;
      });
      state[item].count += 1;
    },
  },
});

export let { addCart, addCount } = items.actions;
export default items;
