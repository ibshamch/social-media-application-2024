// App.js
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import "./App.css";
import useAccountDetailsContext from "./hooks/useAccountDetailsContext";
const App = () => {
  const { checkIfLoginExist } = useAccountDetailsContext();
  useEffect(() => {
    checkIfLoginExist();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Main />
    </div>
  );
};

export default App;
