import { configureStore } from "@reduxjs/toolkit";
import { STATE_KEY } from "../constant";
import counterReducer from "../features/counterSlice";

export const store = configureStore({
  reducer: {
    [STATE_KEY]: counterReducer,
  },
});
