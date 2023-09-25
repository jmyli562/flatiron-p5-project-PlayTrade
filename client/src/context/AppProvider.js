import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [currUser, setCurrUser] = useState({});
  const value = {
    currUser,
    setCurrUser,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
