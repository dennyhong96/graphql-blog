import React, { useReducer, createContext, useEffect } from "react";
import { auth } from "../services/firebase";

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
    case "AUTH_ERROR":
    case "USER_LOGGED_OUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Create context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, INITIAL_STATE);

  // Try to load user to AuthContext on app load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { token } = await user.getIdTokenResult();
        localStorage.setItem("AUTH_TOKEN", token);

        dispatch({
          type: "USER_AUTHENTICATED",
          payload: { email: user.email, token },
        });
      } else {
        localStorage.removeItem("AUTH_TOKEN");
        dispatch({ type: "AUTH_ERROR" });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
