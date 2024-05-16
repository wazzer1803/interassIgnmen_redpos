import {
  configureStore,
  // combineReducers
} from "@reduxjs/toolkit";

import { ItemApi_RTK_QUERY } from "./api/Item_api";

export const store = configureStore({
  reducer: {
    [ItemApi_RTK_QUERY.reducerPath]: ItemApi_RTK_QUERY.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ItemApi_RTK_QUERY.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
