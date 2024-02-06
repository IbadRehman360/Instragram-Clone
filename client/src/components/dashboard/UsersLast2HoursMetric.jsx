import React from "react";

const UsersLast2HoursMetric = ({ usersLast2Hours }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Users Posted in Last 2 Hours
      </h2>
      {usersLast2Hours !== undefined ? (
        <p className="text-4xl">{usersLast2Hours}</p>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default UsersLast2HoursMetric;
