import { ActionTypes } from "../constants/ActionTypes";

export const openSnackbar = (message, severity) => {
  return {
    type: ActionTypes.OPEN_SNACKBAR,
    payload: { message, severity },
  };
};
export const closeSnackbar = () => {
  return {
    type: ActionTypes.CLOSE_SNACKBAR,
    payload: {},
  };
};

export const isLoading = (open) => {
  return {
    type: ActionTypes.SET_ISLOADING,
    payload: open,
  };
};

export const setTempSideMenu = ({ path, pathType }) => {
  return {
    type: ActionTypes.SET_TEMP_PATH,
    payload: { path, pathType },
  };
};

export const setRefreshFlag = () => {
  return {
    type: "UPDATE",
    payload: "update",
  };
};
