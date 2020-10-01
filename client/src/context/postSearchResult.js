import React, { createContext, useReducer } from "react";

export const PostSearchContext = createContext();

const INITIAL_VALUE = {
  searchedResults: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "RESULTS_FETCHED":
      return {
        ...state,
        searchedResults: payload,
      };
    case "RESULTS_CLEARED":
      return {
        ...state,
        searchedResults: [],
      };
    default:
      return state;
  }
};

export const PostSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_VALUE);

  return (
    <PostSearchContext.Provider value={{ state, dispatch }}>
      {children}
    </PostSearchContext.Provider>
  );
};
