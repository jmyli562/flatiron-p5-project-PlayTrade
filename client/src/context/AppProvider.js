import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const value = {};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
