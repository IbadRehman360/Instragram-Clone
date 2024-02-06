import { useState } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";

export default function Comments({
  docId,
  comments: allComments,
  postedBy,
  timestamp,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(2);
  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };
  return (
    <>
      <div className="p-4 ml-1 pt-0 pb-2">
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={item._id} className="mb-1">
            <Link to={`/p/${item.PostedBy.Name}`}>
              <span className="mr-1 text-gray-300 font-semibold">
                {item.PostedBy.Name}
              </span>
            </Link>
            <span className="text-gray-300 ml-1.5">{item.Text}</span>
          </p>
        ))}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            className="text-sm text-gray-base mb-1  text-gray-300 cursor-pointer focus:outline-none"
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                showNextComments();
              }
            }}
          >
            View more comments
          </button>
        )}
        <p className="text-gray-base uppercase text-gray-300 text-xs mt-2">
          {formatDistance(timestamp, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        postedBy={postedBy}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}
