import { createContext, useState } from "react";
import axios from "axios";

const AccountDetailsContext = createContext();

function Provider({ children }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [accountDetails, setAccountDetails] = useState({});
  const [loginState, setLoginState] = useState(false);
  const { id } = accountDetails;
  console.log(accountDetails);
  const onHandlePostComment = async (commentData, postId) => {
    const { data } = await axios.get("http://localhost:3001/accounts");
    const findAcc = data.find((account) => account.id === id);
    const posts = findAcc.posts.map((post) => {
      if (post.postId === postId) {
        return {
          ...post,
          comments: [...post.comments, commentData],
        };
      }
      return post;
    });
    const res = await axios.put(`http://localhost:3001/accounts/${id}`, {
      ...accountDetails,
      posts,
    });
    setAccountDetails(res.data);
  };

  async function onHandleDelete(postId) {
    const { data } = await axios.get("http://localhost:3001/accounts");
    const findAcc = data.find((account) => account.id === id);
    const posts = findAcc.posts.filter((post) => {
      return post.postId !== postId;
    });
    const res = await axios.put(`http://localhost:3001/accounts/${id}`, {
      ...accountDetails,
      posts,
    });
    setAccountDetails(res.data);
  }

  async function onHandleLikes(postId, likes) {
    const { data } = await axios.get("http://localhost:3001/accounts");
    const findAcc = data.find((account) => account.id === id);
    const likeAddition = likes + 1;
    const posts = findAcc.posts.map((post) => {
      if (post.postId === postId) {
        return {
          ...post,
          likes: likeAddition,
        };
      }
      return post;
    });
    const res = await axios.put(`http://localhost:3001/accounts/${id}`, {
      ...accountDetails,
      posts,
    });
    setAccountDetails(res.data);
  }

  async function checkIfLoginExist() {
    try {
      const { data } = await axios.get("http://localhost:3001/accounts");
      const loggedInUser = data.find((account) => account.loginState === true);
      if (loggedInUser) {
        setAccountDetails(loggedInUser);
        setLoginState(true);
        setShowLogOut(true);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }

  function handleLogin() {
    setShowLoginForm(!showLoginForm);
    setShowSignUpForm(false);
  }

  function handleSignUp() {
    setShowSignUpForm(!showSignUpForm);
    setShowLoginForm(false);
  }

  function handleLogOut() {
    setShowLogOut(false);
    setShowSignUpForm(false);
    setShowLoginForm(false);
    setAccountDetails({});
    setLoginState(false);
  }

  function setAccount(account) {
    setAccountDetails(account);
    setShowLoginForm(false);
    setShowSignUpForm(false);
    setShowLogOut(true);
    setLoginState(true);
  }

  const onShowLogOut = () => setShowLogOut(true);
  const dataToShare = {
    setAccount,
    onHandleLogOut: handleLogOut,
    onHandleSignUp: handleSignUp,
    onHandleLogin: handleLogin,
    checkIfLoginExist,
    onHandleDelete,
    onHandleLikes,
    onHandlePostComment,
    showLogOut,
    setShowLogOut,
    loginState,
    setLoginState,
    accountDetails,
    showLoginForm,
    setShowLoginForm,
    showSignUpForm,
    onShowLogOut,
    setAccountDetails,
  };
  return (
    <AccountDetailsContext.Provider value={dataToShare}>
      {children}
    </AccountDetailsContext.Provider>
  );
}

export default AccountDetailsContext;

export { Provider };
