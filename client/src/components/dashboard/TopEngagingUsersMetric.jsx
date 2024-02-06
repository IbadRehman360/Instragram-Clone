import React from "react";

const TopEngagingUsersMetric = ({ topEngagingUsers }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Top 10 Engaging Users</h2>
      {topEngagingUsers.length > 0 ? (
        <ul>
          {topEngagingUsers.map((user, index) => (
            <li key={index}>
              User ID: {user.userId}, Likes: {user.likes}, Comments:{" "}
              {user.comments}
            </li>
          ))}
        </ul>
      ) : (
        <p>No engaging users available</p>
      )}
    </div>
  );
};

export default TopEngagingUsersMetric;
