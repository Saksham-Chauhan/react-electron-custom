import { createSlice } from "@reduxjs/toolkit";
import { STATE_KEY } from "../constant";
import { ProxyState } from "./initial-state/proxy";

const initialState = {
  ...ProxyState,
  modals: {
    proxyGroup: false,
  },
};

export const counterSlice = createSlice({
  name: STATE_KEY,
  initialState,

  reducers: {
    setProxyState: (state, action) => {
      state.proxyGroup = action.payload;
    },
    setModalState: (state, action) => {
      const key = action.payload;
      state.modals[key] = !state.modals[key];
    },
  },
});

export const { setProxyState, setModalState } = counterSlice.actions;

export default counterSlice.reducer;

// PROXY SELECTOR
export const fetchProxyGroupList = (state) => state[STATE_KEY].proxyGroup;
export const fetchProxyGroupModalState = (state) =>
  state[STATE_KEY].modals.proxyGroup;
