import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import GeneralReducer from "./slices/general.slice";
import MessageReducer from "./slices/message.slice";
import RequestReducer from "./slices/request.slice";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./slices/auth.slice";
import UserReducer from "./slices/user.slice";

const persistConfig = {
  key: "emergtrack",
  storage,
  blacklist: ['general']
};

export const rootReducer = combineReducers({
  general: GeneralReducer,
  auth: AuthReducer,
  message: MessageReducer,
  request: RequestReducer,
  user: UserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;