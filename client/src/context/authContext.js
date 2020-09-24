import React, { useReducer, createContext } from "react";

// Initial State
const INITIAL_STATE = {
  user: null,
};

// Reducer
const firebaseReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_AUTHENTICATED":
      return { ...state, user: payload };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Create context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
