import React, { createContext, useState } from "react";

export const UpdatePostContext = createContext();

export const UpdatePostProvider = ({ children }) => {
  const [state, setState] = useState({ show: false, post: null });

  return (
    <UpdatePostContext.Provider value={{ state, setState }}>
      {children}
    </UpdatePostContext.Provider>
  );
};
