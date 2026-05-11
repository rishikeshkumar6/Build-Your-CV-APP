import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./services/userService";
import resumeReducer from "./services/resumeService";
import { combineReducers } from "@reduxjs/toolkit";

const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  resume: resumeReducer,
});

const rootReducers = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};
const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
export default store;
