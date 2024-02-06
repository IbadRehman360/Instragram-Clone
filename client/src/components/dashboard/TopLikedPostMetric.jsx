import React from "react";

const TopLikedPostMetric = ({ topLikedPost }) => {
  console.log({ topLikedPost });

  const postTitle = topLikedPost ? topLikedPost.Title : "No Top Liked Post";
  const likesCount = topLikedPost ? topLikedPost.Likes.length : 0;

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Top Liked Post</h2>
      {topLikedPost ? (
        <div>
          <p>Title: {postTitle}</p>
          <p>Number of Likes: {likesCount}</p>
        </div>
      ) : (
        <p>No top liked post available</p>
      )}
    </div>
  );
};

export default TopLikedPostMetric;
