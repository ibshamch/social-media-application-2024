// Form.js
import React, { useState } from "react";
import Button from "./Button";
import "./Form.css";
import axios from "axios";
import useAccountDetailsContext from "../hooks/useAccountDetailsContext";
const Form = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAccountDetails, setLoginState } = useAccountDetailsContext();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("http://localhost:3001/accounts");

    let findAccount = data.find(
      (account) => account.email === email && account.password === password
    );

    if (findAccount) {
      const { data } = await axios.put(
        `http://localhost:3001/accounts/${findAccount.id}`,
        {
          ...findAccount,
          loginState: true,
        }
      );
      setAccountDetails(data);
      setLoginState(true);
    } else {
      console.log("Account not found");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userDetails = { email, password, loginState: true, posts: [] };

    try {
      const res = await axios.get("http://localhost:3001/accounts");
      const checkIfUserAlreadyExists = res.data.some((account) => {
        return account.email === email;
      });

      if (checkIfUserAlreadyExists) {
        console.error("Email Already Exists");
      } else {
        const { data } = await axios.post(
          "http://localhost:3001/accounts",
          userDetails
        );
        setAccountDetails(data);
        setLoginState(true);
      }
    } catch (error) {
      console.log("Error occurred during sign up:", error);
    }
  };

  return (
    <form className="login-form">
      <h2>{type}</h2>
      <input
        value={email}
        type="text"
        onChange={handleEmail}
        placeholder="Enter your Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        placeholder="Enter your Password"
        required
      />
      <Button
        modifierClass="login-form-btn"
        onClick={type.toLowerCase() === "login" ? handleLogin : handleSignUp}
      >
        {type}
      </Button>
    </form>
  );
};

export default Form;
