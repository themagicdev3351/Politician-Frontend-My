import { ActionTypes } from "../constants/ActionTypes";
// search
export const search = (data) => {
    return {
      type: ActionTypes.SEARCH_START,
      payload: data,
    };
  };