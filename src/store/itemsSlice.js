import { createSlice } from "@reduxjs/toolkit";

let items = createSlice({
  name: "Items",
  initialState: [
    { id: 0, name: "Mala", count: 2 },
    { id: 1, name: "Crayola", count: 1 },
  ],
  reducers: {
    addCount(state) {
      state[0].count += 1;
    },
  },
});

export let { addCount } = items.actions;
export default items;
