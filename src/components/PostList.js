import "./Post.css";
import Post from "./Post";
import useAccountDetailsContext from "../hooks/useAccountDetailsContext";
const PostList = () => {
  const { accountDetails } = useAccountDetailsContext();
  const { posts } = accountDetails;

  const postsRender = posts.map((data) => {
    return <Post key={data.postId} data={data} />;
  });

  return <div className="posts">{postsRender}</div>;
};

export default PostList;
