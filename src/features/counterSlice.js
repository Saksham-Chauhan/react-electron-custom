import { createSlice } from "@reduxjs/toolkit";
import { STATE_KEY } from "../constant";
import { ProxyState } from "./initial-state/proxy";

const initialState = {
  tempStorage: {},
  ...ProxyState,
  modals: {
    proxyGroup: false,
  },
};

export const counterSlice = createSlice({
  name: STATE_KEY,
  initialState,

  reducers: {
    appendProxyGroupInList: (state, action) => {
      state.proxyGroup = action.payload;
    },
    setModalState: (state, action) => {
      const key = action.payload;
      state.modals[key] = !state.modals[key];
    },
    setTempStorage: (state, action) => {
      state.tempStorage = action.payload;
    },
  },
});

export const { appendProxyGroupInList, setModalState, setTempStorage } =
  counterSlice.actions;

export default counterSlice.reducer;
export const fetchTempStorageState = (state) => state[STATE_KEY].tempStorage;
// PROXY SELECTOR
export const fetchProxyGroupList = (state) => state[STATE_KEY].proxyGroup;
export const fetchProxyGroupModalState = (state) =>
  state[STATE_KEY].modals.proxyGroup;
