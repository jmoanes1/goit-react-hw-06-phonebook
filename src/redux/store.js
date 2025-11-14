// code for redux store //

import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export default store;


// end of redux store code //
