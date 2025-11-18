// Code for redux //

import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

// Default sample contacts - these will be used on first load if localStorage is empty
// After first load, contacts are persisted to localStorage and will be loaded from there
const initialContacts = [
  { id: "1", name: "Rosie Simpson", number: "459-12-56-7" },
  { id: "2", name: "Hermione Kline", number: "443-89-12-3" },
  { id: "3", name: "Eden Clements", number: "645-17-79-0" },
  { id: "4", name: "Annie Copeland", number: "227-91-26-6" },
];

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: initialContacts, // Default contacts - persisted to localStorage on first load
    filter: "", // Filter is not persisted (temporary UI state)
  },
  reducers: {
    addContact: (state, action) => {
      // action.payload expected: { id, name, number }
      // prevent duplicates server-side too (case-insensitive)
      const exists = state.items.some(
        (c) => c.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (!exists) {
        state.items.unshift(action.payload); // add to top
        // redux-persist will automatically save this change to localStorage
      }
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((c) => c.id !== id);
      // redux-persist will automatically save this change to localStorage
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  // Handle rehydration from localStorage
  // This ensures default contacts are present if localStorage is empty or corrupted
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      // When rehydrating from localStorage, action.payload contains the persisted state
      // Since we're using persistReducer with whitelist: ["items"], 
      // the payload structure is: { items: [...] } or undefined if empty
      if (action.payload && action.payload.items && Array.isArray(action.payload.items) && action.payload.items.length > 0) {
        // If localStorage has valid contacts, use them
        state.items = action.payload.items;
      } else {
        // If localStorage is empty, undefined, or invalid, use default contacts
        // This ensures the 4 default contacts always appear on first load
        state.items = [...initialContacts];
      }
      // Always reset filter on rehydration (filter is temporary UI state)
      state.filter = "";
    });
  },
});

export const { addContact, deleteContact, updateFilter } = contactsSlice.actions;
export default contactsSlice.reducer;


// end of redux code //



