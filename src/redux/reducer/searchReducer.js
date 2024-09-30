import { ActionTypes } from "../constants/ActionTypes";

const initialState = { query: "" };
export const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SEARCH_START:
      return { query: payload };
    default:
      return state;
  }
};
