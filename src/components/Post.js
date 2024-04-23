import { useState } from "react";
import Button from "./Button";
import useAccountDetailsContext from "../hooks/useAccountDetailsContext";

function Post({ data }) {
  const { postedBy, post, postedDate, comments, postId, likes } = data;
  const { onHandleDelete, onHandleLikes, onHandlePostComment } =
    useAccountDetailsContext();

  const [commentState, setCommentState] = useState(false);
  const [commentText, setCommentText] = useState("");
  const handleComments = () => {
    setCommentState(!commentState);
  };
  return (
    <div className="post">
      <em className="posted-by">
        -{postedBy} said : <strong className="posted-date">{postedDate}</strong>
      </em>
      <p className="post-details">{post}</p>
      {commentState && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const commentData = {
              commentText,
              id: Date.now(),
              time: `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()} `,
            };
            onHandlePostComment(commentData, postId);
            setCommentText("");
          }}
          className="comments-container"
        >
          <strong>Comments :</strong>
          {comments.map((comment) => {
            return (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={comment.id}
              >
                <p>{comment.commentText}</p>
                <div>
                  <em>Anonymous user said At: </em>
                  <strong> {comment.time}</strong>
                </div>
              </div>
            );
          })}
          Add new Comment:
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type Comment"
          />
          <Button modifierClass="post-comment">Post Comment</Button>
        </form>
      )}

      <div className="actions">
        <Button
          onClick={() => onHandleLikes(postId, likes)}
          modifierClass="action-btn like"
        >
          Likes ({likes})
        </Button>
        <Button modifierClass="action-btn comment" onClick={handleComments}>
          Comment ({comments.length})
        </Button>
        <Button
          modifierClass="action-btn delete"
          onClick={() => onHandleDelete(postId)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
export default Post;
