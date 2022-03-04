import { configureStore } from "@reduxjs/toolkit";
import { STATE_KEY } from "../constant";
import counterReducer from "../features/counterSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "Kyros-storage",
  storage,
  blacklist: [
    "addGmail",
    "editProxy",
    "proxyGroup",
    "spoofModal",
    "editStorage",
    "discordAccount",
    "inviteJoinerAccount",
    "inviteJoinerSetting",
  ],
};

const persistKyrosReducer = persistReducer(persistConfig, counterReducer);

export const store = configureStore({
  reducer: {
    [STATE_KEY]: persistKyrosReducer,
  },
});
