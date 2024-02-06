import React from "react";

const TopCommentedPostMetric = ({ topCommentedPost }) => {
  const postTitle = topCommentedPost
    ? topCommentedPost.Title
    : "No Top Commented Post";
  const commentsCount = topCommentedPost ? topCommentedPost.Comments.length : 0;
  const likesCount = topCommentedPost ? topCommentedPost.Likes.length : 0;
  console.log(topCommentedPost);
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Top Commented Post</h2>
      {topCommentedPost ? (
        <div className="space-y-2">
          <p className="text-lg font-medium">Title: {postTitle}</p>
          <p className="font-semibold">Number of Comments: {commentsCount}</p>
          <span className=" font-semibold"> Likes:</span> {likesCount}
        </div>
      ) : (
        <p className="text-gray-500">No top commented post available</p>
      )}
    </div>
  );
};

export default TopCommentedPostMetric;
