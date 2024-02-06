import React from "react";

const UsersWithMoreThanXFollowersMetric = ({ usersWithMoreThanXFollowers }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Users with More Than 1 Follower
      </h2>
      {usersWithMoreThanXFollowers !== undefined ? (
        <p className="text-4xl">{usersWithMoreThanXFollowers}</p>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default UsersWithMoreThanXFollowersMetric;
