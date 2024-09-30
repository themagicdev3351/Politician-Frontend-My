import { ActionTypes } from "../constants/ActionTypes";
export const snackbarReducer = (
  state = { open: false, message: "", severity: "success" },
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.OPEN_SNACKBAR:
      return { open: true, ...payload };
    case ActionTypes.CLOSE_SNACKBAR:
      return { ...state, open: false };
    default:
      return state;
  }
};

export const setIsLoading = (state = { open: false }, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ISLOADING:
      return { open: payload };
    default:
      return state;
  }
};

export const tempPathReducer = (state = { path: "", pathType: "active" }, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TEMP_PATH:
      return { ...payload };
    default:
      return state;
  }
};

export const refreshFlag = (state = false, { type, payload }) => {
  switch (type) {
    case "UPDATE":
      return !state;
    default:
      return false;
  }
};
