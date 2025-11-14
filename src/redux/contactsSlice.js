// Code for redux //

import { createSlice } from "@reduxjs/toolkit";

// default sample contacts
const initialContacts = [
  { id: "1", name: "Rosie Simpson", number: "459-12-56-7" },
  { id: "2", name: "Hermione Kline", number: "443-89-12-3" },
  { id: "3", name: "Eden Clements", number: "645-17-79-0" },
  { id: "4", name: "Annie Copeland", number: "227-91-26-6" },
];

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: initialContacts,
    filter: "",
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
      }
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((c) => c.id !== id);
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, updateFilter } = contactsSlice.actions;
export default contactsSlice.reducer;


// end of redux code //



