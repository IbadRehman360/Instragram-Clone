import { useState, useContext } from "react";
import apiService from "../../services/PostApi";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
  postedBy,
}) {
  const [comment, setComment] = useState("");

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (comment.length < 1) {
      return;
    }

    try {
      const result = await apiService.addComment(docId, comment, postedBy);

      setComments([...comments, result.Comments[result.Comments.length - 1]]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey && comment.length >= 1) {
      event.preventDefault();
      handleSubmitComment(event);
    }
  };
  return (
    <div className=" pb-4 px-2  ">
      <form
        className="flex items-center border-gray-primary"
        method="POST"
        onSubmit={handleSubmitComment}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="w-full py-3.5 px-4 mx-2 text-sm rounded-xl bg-zinc-800   text-gray-300 focus:outline-none"
          type="text"
          name="add-comment"
          placeholder="Enter your comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          onKeyDown={handleKeyPress}
          ref={commentInput}
        />
      </form>
    </div>
  );
}
