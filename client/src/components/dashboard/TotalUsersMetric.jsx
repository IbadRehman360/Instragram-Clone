import React from 'react';

const TotalUsersMetric = ({ totalUsers }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Total Users</h2>
      <p className="text-4xl">{totalUsers}</p>
    </div>
  );
};

export default TotalUsersMetric;
