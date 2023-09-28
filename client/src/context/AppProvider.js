import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  function createSlugTitle(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");
  }
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
    createSlugTitle,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
