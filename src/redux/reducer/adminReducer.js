import { store } from ".";
import { ActionTypes } from "../constants/ActionTypes";

const initialState = { isAuthenticated: false, isAdmin: false, isLoggedIn: false };
export const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADMIN_LOGIN:
      return { ...state, ...payload, isAuthenticated: true, isAdmin: true, isLoggedIn: true };
    case ActionTypes.ADMIN_AUTH:
      return { ...state, ...payload, isAuthenticated: true, isAdmin: true, isLoggedIn: true };
    case ActionTypes.ADMIN_LOGOUT:
      // store.dispatch({ type: "RESET_PERSISTED_STATE" });
      return { ...initialState };
    default:
      return state;
  }
};
