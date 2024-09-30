// import { applyMiddleware, combineReducers, createStore } from "redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "@redux-devtools/extension";
import { refreshFlag, setIsLoading, snackbarReducer, tempPathReducer } from "./defaultReducer";
import { adminReducer } from "./adminReducer";
import { searchReducer } from "./searchReducer";
import { expirationMiddleware } from "../middleware/expirationMiddleware";

const allAdminReducer = combineReducers({
  admin: adminReducer,
  snackbar: snackbarReducer,
  loading: setIsLoading,
  refFlag: refreshFlag,
  search: searchReducer,
  // tempSideMenuPath: tempPathReducer,
});

const reducer = allAdminReducer;
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["admin"],
};

const adminPersistReducer = persistReducer(persistConfig, reducer);
// const store = createStore(
//   adminPersistReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   composeWithDevTools(
//     applyMiddleware(expirationMiddleware)
//   )
//   // process.env.NODE_ENV !== 'production'
// );

// Root reducer with state reset
// const rootReducer = (state, action) => {
//   if (action.type === 'RESET_PERSISTED_STATE') {
//     state = undefined;
//   }
//   return adminPersistReducer(state, action);
// };

const store = configureStore({
  reducer: (state, action) => {
    if (action.type === "RESET_PERSISTED_STATE") {
      storage.removeItem("persist:root"); // Clear the persisted state
      state = undefined;
    }
    return adminPersistReducer(state, action);
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(expirationMiddleware),
  devTools: composeWithDevTools,
});

store.subscribe(() => {
  localStorage.setItem("persistedTimestamp", Date.now().toString());
});

const persistor = persistStore(store);
// export default allAdminReducer;
export { store, persistor };
