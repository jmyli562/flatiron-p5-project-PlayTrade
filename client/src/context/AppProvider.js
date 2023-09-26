import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [currUser, setCurrUser] = useState({
    username: "",
    email: "",
    library: [],
    review: [],
    comment: [],
    points: 0,
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [selectedGame, setSelectedGame] = useState({});
  const value = {
    currUser,
    setCurrUser,
    isLoggedIn,
    setLoggedIn,
    selectedGame,
    setSelectedGame,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
