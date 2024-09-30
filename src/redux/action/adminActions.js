
import { store } from "../reducer/index";
import { ActionTypes } from "../constants/ActionTypes";


export const login = (data) => {
  return {
    type: ActionTypes.ADMIN_LOGIN,
    payload: data,
  };
};

export const logout = () => {
  // store.dispatch({ type: "RESET_PERSISTED_STATE" });
  store.dispatch({ type: ActionTypes.ADMIN_LOGOUT });
  store.dispatch({ type: ActionTypes.RESET_PERSISTED_STATE });
  return {
    type: ActionTypes.ADMIN_LOGOUT,
    payload: {},
  };
};

// admin auth action
export const adminAuth = (data) => {
  return {
    type: ActionTypes.ADMIN_AUTH,
    payload: data,
  };
};