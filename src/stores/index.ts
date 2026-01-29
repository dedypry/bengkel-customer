import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./features/auth/auth-slice";
import region from "./features/region/region-slice";
import wo from "./features/wo/wo-slice";

const persistedAuthReducer = persistReducer({ key: "auth", storage }, auth);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    region,
    wo,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
