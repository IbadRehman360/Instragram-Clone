import React, { createContext, useContext, useReducer, useEffect } from "react";

const UserContext = createContext({});

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("userData")) || {};
  const [state, dispatch] = useReducer(userReducer, { user: storedUser });

  const setUser = (userData) => {
    dispatch({ type: "SET_USER", payload: userData });
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  useEffect(() => {
    const storedUserOnMount =
      JSON.parse(localStorage.getItem("userData")) || {};
    if (Object.keys(storedUserOnMount).length > 0) {
      setUser(storedUserOnMount);
    }
  }, []);

  const contextValue = { user: state.user, setUser };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
