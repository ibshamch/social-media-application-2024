// Main.js
import Form from "./Form";
import "./Main.css";
import PostCreator from "./PostCreator";
import PostList from "./PostList";
import useAccountDetailsContext from "../hooks/useAccountDetailsContext";
const Main = () => {
  const { showLoginForm, showSignUpForm, showLogOut, loginState } =
    useAccountDetailsContext();
  return (
    <div className="main">
      {!loginState && (
        <>
          {showLoginForm && <Form type="Login" />}
          {showSignUpForm && <Form type="Sign Up" />}
          {!showLoginForm && !showSignUpForm && (
            <div className="login-to-view">Log in To View Content</div>
          )}
        </>
      )}
      {loginState && (
        <div className="feed">
          <PostCreator />
          <PostList />
        </div>
      )}
    </div>
  );
};

export default Main;
