// import { configureStore } from "@reduxjs/toolkit";
// import { adminReducer } from "./slices/adminSlice";

// export const store = configureStore({
//   reducer: {
//     admin: adminReducer,
//   },
// });
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import { adminReducer } from "./slices/adminSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  admin: adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
