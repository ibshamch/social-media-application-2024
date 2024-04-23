import { useState } from "react";
import Button from "./Button";
import "./PostCreator.css";
import axios from "axios";
import useAccountDetailsContext from "../hooks/useAccountDetailsContext";
const PostCreator = () => {
  const { setAccountDetails, accountDetails } = useAccountDetailsContext();

  const { email, posts, id } = accountDetails;

  const [postText, setPostText] = useState("");
  const handlePostText = (e) => setPostText(e.target.value);
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const post = {
      postedBy: email,
      post: postText,
      postedDate: new Date().toDateString(),
      postId: Date.now(),
      comments: [],
      likes: 0,
    };
    const { data } = await axios.put(`http://localhost:3001/accounts/${id}`, {
      ...accountDetails,
      posts: [...posts, post],
    });

    setAccountDetails(data);
    setPostText("");
  };
  return (
    <form className="post-creator-form" onSubmit={handlePostSubmit}>
      <h3>Share your thinking with the world!</h3>
      <textarea
        value={postText}
        onChange={handlePostText}
        className="post-creator-input"
        placeholder="What's in your mind"
        maxLength={50}
      />
      <Button type="submit" modifierClass="post-creator-button">
        Post
      </Button>
    </form>
  );
};

export default PostCreator;
