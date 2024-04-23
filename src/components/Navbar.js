// Navbar.js
import React from "react";
import Button from "./Button";
import "./Navbar.css";
import axios from "axios";
import useAccountDetailsContext from "../hooks/useAccountDetailsContext";
const Navbar = () => {
  const {
    onHandleLogin,
    onHandleLogOut,
    loginState,
    accountDetails,
    onHandleSignUp,
  } = useAccountDetailsContext();
  const { id, email } = accountDetails;

  async function handleLogout(id) {
    onHandleLogOut();
    await axios.put(`http://localhost:3001/accounts/${id}`, {
      ...accountDetails,
      loginState: false,
    });
  }

  return (
    <div className="navbar">
      <h1>{accountDetails.email ? email : "Social Media Application"}</h1>
      <div className="btn-container">
        {!loginState && (
          <>
            <Button modifierClass="login" onClick={onHandleLogin}>
              Login
            </Button>
            <Button modifierClass="signup" onClick={onHandleSignUp}>
              SignUp
            </Button>
          </>
        )}
        {loginState && (
          <Button modifierClass="logout" onClick={() => handleLogout(id)}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
