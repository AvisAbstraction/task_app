import React, { useState, useEffect } from "react";
import { TOKEN, USER_ID } from "../config";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  localStorage.setItem("token", TOKEN);
  localStorage.setItem("user_id", USER_ID);

  const [state, setAuth] = useState({
    token: localStorage.getItem("token"),
    user_id: localStorage.getItem("user_id"),
  });
  const { token, user_id } = state;

  return (
    <AuthContext.Provider
      value={{
        token,
        user_id,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
