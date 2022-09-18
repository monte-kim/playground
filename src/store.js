import { configureStore } from "@reduxjs/toolkit";
import user from "./store/userSlice";
import items from "./store/itemsSlice";

// //similar to useState()
// let user = createSlice({
//   name: "User Name",
//   initialState: { name: "Monte", age: 25 },
//   reducers: {
//     //this state changing function
//     changeName(state) {
//       state.name = "Clemente";
//     },
//     changeAge(state, action) {
//       state.age += action.payload;
//     },
//   },
// });

// let items = createSlice({
//   name: "Items",
//   initialState: [
//     { id: 0, name: "Mala", count: 2 },
//     { id: 1, name: "Crayola", count: 1 },
//   ],
// });

// //export the state changing function
// export let { changeName, changeAge } = user.actions;

//load so others can use
export default configureStore({
  reducer: {
    user: user.reducer,
    items: items.reducer,
  },
});
