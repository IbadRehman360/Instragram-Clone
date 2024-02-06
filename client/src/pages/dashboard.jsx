// Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalUsersMetric from './TotalUsersMetric';
import UsersLast2HoursMetric from './UsersLast2HoursMetric';
import UsersWithMoreThanXFollowersMetric from './UsersWithMoreThanXFollowersMetric';
import TopLikedPostMetric from './TopLikedPostMetric';
import TopCommentedPostMetric from './TopCommentedPostMetric';
import TopEngagingUsersMetric from './TopEngagingUsersMetric';

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [postsData, setPostsData] = useState([]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${api}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch posts data
  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${api}/allpost`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setPostsData(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts data:", error);
      }
    };

    fetchPostsData();
  }, []);

  // Calculate dashboard metrics
  const totalUsers = userData.length;
  const usersLast2Hours = userData.filter(user => /* Add logic to check if user posted in the last 2 hours */).length;
  const usersWithMoreThanXFollowers = userData.filter(user => user.Followers.length > X).length;

  const topLikedPost = postsData.reduce((prev, current) => (current.Likes.length > prev.Likes.length ? current : prev), {});
  const topCommentedPost = postsData.reduce((prev, current) => (current.Comments.length > prev.Comments.length ? current : prev), {});
  
  const topEngagingUsers = postsData.reduce((usersEngagement, post) => {
    post.Likes.forEach(like => {
    });
    post.Comments.forEach(comment => {
    });
    return usersEngagement;
  }, []).slice(0, 10);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-8">
        <TotalUsersMetric totalUsers={totalUsers} />
        <UsersLast2HoursMetric usersLast2Hours={usersLast2Hours} />
        <UsersWithMoreThanXFollowersMetric usersWithMoreThanXFollowers={usersWithMoreThanXFollowers} />
        <TopLikedPostMetric topLikedPost={topLikedPost} />
        <TopCommentedPostMetric topCommentedPost={topCommentedPost} />
        <TopEngagingUsersMetric topEngagingUsers={topEngagingUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
