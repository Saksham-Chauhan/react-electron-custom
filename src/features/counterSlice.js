import { createSlice } from "@reduxjs/toolkit";
import { STATE_KEY } from "../constant";
import { ProxyState } from "./initial-state/proxy";

const initialState = {
  ...ProxyState,
};

export const counterSlice = createSlice({
  name: STATE_KEY,
  initialState,

  reducers: {
    setProxyState: (state, action) => {
      state.proxyGroup = action.payload;
    },
  },
});

export const { setProxyState } = counterSlice.actions;

export default counterSlice.reducer;

// PROXY SELECTOR
export const fetchProxyGroupList = (state) => state[STATE_KEY].proxyGroup;
