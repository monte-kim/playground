import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "User Name",
  initialState: { name: "Monte", age: 25 },
  reducers: {
    //this state changing function
    changeName(state) {
      state.name = "Clemente";
    },
    changeAge(state, action) {
      state.age += action.payload;
    },
  },
});

export let { changeName, changeAge } = user.actions;

export default user;
