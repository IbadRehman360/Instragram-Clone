import React from "react";

const TopLikedPostMetric = ({ topLikedPost }) => {
  const postTitle = topLikedPost ? topLikedPost.Title : "No Top Liked Post";
  const likesCount = topLikedPost ? topLikedPost.Likes.length : 0;

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Top Liked Post</h2>
      {topLikedPost ? (
        <div className="space-y-2">
          <p className=" font-medium">Title: {postTitle}</p>
          <p className="text-md  font-semibold">
            Number of Likes: {likesCount}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No top liked post available</p>
      )}
    </div>
  );
};

export default TopLikedPostMetric;
