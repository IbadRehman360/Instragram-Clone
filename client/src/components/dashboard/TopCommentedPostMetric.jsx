import React from "react";

const TopCommentedPostMetric = ({ topCommentedPost }) => {
  console.log({ topCommentedPost });

  const postTitle = topCommentedPost
    ? topCommentedPost.Title
    : "No Top Commented Post";
  const commentsCount = topCommentedPost ? topCommentedPost.Comments.length : 0;

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Top Commented Post</h2>
      {topCommentedPost ? (
        <div>
          <p>Title: {postTitle}</p>
          <p>Number of Comments: {commentsCount}</p>
          {/* Add additional information as needed */}
        </div>
      ) : (
        <p>No top commented post available</p>
      )}
    </div>
  );
};

export default TopCommentedPostMetric;
