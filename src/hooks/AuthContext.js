import React, { createContext, useReducer, useState } from "react";
import { AuthContext } from "../App";
// export const AuthContext = createContext();
const initUser = {
  username: "",
  role: "",
};
const userReducer = (state, action) => {
  switch (action) {
    case "UPDATE_ROLE": {
      return {
        username: action.payload.username,
        role: action.payload.role,
      };
    }
  }
};
export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initUser);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
