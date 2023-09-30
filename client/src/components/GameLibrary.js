import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";

function GameLibrary() {
  const { currUser } = useContext(AppContext);
  console.log(currUser);
  return <div>GameLibrary</div>;
}

export default GameLibrary;
