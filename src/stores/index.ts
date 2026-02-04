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
import booking from "./features/booking/booking-slice";
import brands from "./features/brand/brand-slice";
import dashboard from "./features/dashboard/dashboard-slice";
import ai from "./features/ai/ai-slice";

const persistedAuthReducer = persistReducer({ key: "auth", storage }, auth);
const persistedChatReducer = persistReducer({ key: "chat", storage }, ai);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    region,
    wo,
    booking,
    brands,
    dashboard,
    ai: persistedChatReducer,
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
