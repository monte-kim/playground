import { configureStore, createSlice } from "@reduxjs/toolkit";

//similar to useState()
let user = createSlice({
  name: "User Name",
  initialState: "Monte",
  reducers: {
    //state changing function
    changeName() {
      return "Clemente";
    },
  },
});

let items = createSlice({
  name: "Items",
  initialState: [
    { id: 0, name: "Mala", count: 2 },
    { id: 1, name: "Crayola", count: 1 },
  ],
});

//export the state changing function
export let { changeName } = user.actions;

//load so others can use
export default configureStore({
  reducer: {
    user: user.reducer,
    items: items.reducer,
  },
});
