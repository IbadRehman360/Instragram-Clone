import React, { useState, useEffect } from "react";
import TotalUsersMetric from "../components/dashboard/TotalUsersMetric";
import UsersLast2HoursMetric from "../components/dashboard/UsersLast2HoursMetric";
import UsersWithMoreThanXFollowersMetric from "../components/dashboard/UsersWithMoreThanXFollowersMetric";
import TopLikedPostMetric from "../components/dashboard/TopLikedPostMetric";
import TopCommentedPostMetric from "../components/dashboard/TopCommentedPostMetric";
import TopEngagingUsersMetric from "../components/dashboard/TopEngagingUsersMetric";
import UserService from "../services/UserApi";
import Header from "../components/header";
import { useUser } from "../context/user";

const Dashboard = () => {
  const X = 1;
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await UserService.getAllUsers();
        setUserData(users);
      } catch (error) {
        console.error("Error Fetching User Data ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(userData);

  const totalUsers = userData.users.length;

  const usersLast2Hours = userData.users.filter(
    (user) => user.lastActiveWithin2Hours
  ).length;

  const usersWithMoreThanXFollowers = userData.users.filter(
    (user) => user.Followers.length > X
  ).length;

  const topLikedPost =
    userData.posts.length > 0
      ? userData.posts.reduce(
          (prev, current) =>
            current.Likes.length > (prev.Likes ? prev.Likes.length : 0)
              ? current
              : prev,
          userData.posts[0]
        )
      : null;

  const topCommentedPost =
    userData.posts.length > 0
      ? userData.posts.reduce(
          (prev, current) =>
            current.Comments.length > (prev.Comments ? prev.Comments.length : 0)
              ? current
              : prev,
          userData.posts[0]
        )
      : null;

  const userEngagement =
    userData.posts && userData.posts.length > 0
      ? userData.posts.reduce((usersEngagement, post) => {
          post.Likes.forEach((like) => {
            if (usersEngagement[like]) {
              usersEngagement[like].likes++;
            } else {
              usersEngagement[like] = { likes: 1, comments: 0 };
            }
          });

          post.Comments.forEach((comment) => {
            const userId = comment.PostedBy.$oid;
            if (usersEngagement[userId]) {
              usersEngagement[userId].comments++;
            } else {
              usersEngagement[userId] = { likes: 0, comments: 1 };
            }
          });

          return usersEngagement;
        }, {})
      : {};

  const topEngagingUsers = Object.entries(userEngagement)
    .sort(([, a], [, b]) => b.likes + b.comments - (a.likes + a.comments))
    .slice(0, 10)
    .map(([userId, engagement]) => {
      const user = userData.users.find((user) => user._id === userId);
      return {
        userId,
        likes: engagement.likes,
        comments: engagement.comments,
        name: user ? user.Name : "Unknown User",
      };
    });

  return (
    <div className="bg-zinc-950     ">
      <Header user={user} setIsOpen={setIsOpen} />

      <div className="px-20 ">
        <h1 className="text-3xl text-white font-semibold mb-6">Dashboard</h1>

        <div className="grid grid-cols-2  gap-8 w-full">
          <TotalUsersMetric totalUsers={totalUsers} />
          <UsersLast2HoursMetric usersLast2Hours={usersLast2Hours} />
          <UsersWithMoreThanXFollowersMetric
            usersWithMoreThanXFollowers={usersWithMoreThanXFollowers}
          />
          <TopLikedPostMetric topLikedPost={topLikedPost} />
          <TopCommentedPostMetric topCommentedPost={topCommentedPost} />
          <TopEngagingUsersMetric topEngagingUsers={topEngagingUsers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
