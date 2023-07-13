import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
// import authReducer from "./authRedux";

export default configureStore({
  reducer: {
    // auth: authReducer,
    cart: cartReducer,
  },
});
