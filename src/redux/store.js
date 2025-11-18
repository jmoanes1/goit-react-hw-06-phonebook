// code for redux store //

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import contactsReducer from "./contactsSlice";

// Configuration for persisting contacts to localStorage
const persistConfig = {
  key: "contacts", // key for localStorage
  storage, // use localStorage
  // Only persist the items array, not the filter (filter is temporary UI state)
  whitelist: ["items"], // only persist contacts items, not filter
  // Version for migration handling
  version: 1,
};

// Create persisted reducer
const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
  },
  // Disable serializable check for redux-persist actions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/PURGE", "persist/REGISTER"],
      },
    }),
});

// Create persistor for PersistGate
export const persistor = persistStore(store);

export default store;

// end of redux store code //
