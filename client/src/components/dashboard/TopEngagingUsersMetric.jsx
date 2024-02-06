import React from "react";

const TopEngagingUsersMetric = ({ topEngagingUsers }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Top 10 Engaging Users</h2>
      {topEngagingUsers.length > 0 ? (
        <ul className="list-disc pl-4">
          {topEngagingUsers.map((user, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">User ID:</span> {user.name} |
              <span className="ml-2 font-semibold"> Likes:</span> {user.likes} |
              <span className="ml-2 font-semibold"> Comments:</span>{" "}
              {user.comments}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No engaging users available</p>
      )}
    </div>
  );
};

export default TopEngagingUsersMetric;
