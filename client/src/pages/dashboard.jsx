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
            if (usersEngagement[comment.PostedBy.$oid]) {
              usersEngagement[comment.PostedBy.$oid].comments++;
            } else {
              usersEngagement[comment.PostedBy.$oid] = {
                likes: 0,
                comments: 1,
              };
            }
          });

          return usersEngagement;
        }, {})
      : {};

  const topEngagingUsers = Object.entries(userEngagement)
    .sort(([, a], [, b]) => b.likes + b.comments - (a.likes + a.comments))
    .slice(0, 10)
    .map(([userId, engagement]) => ({
      userId,
      likes: engagement.likes,
      comments: engagement.comments,
    }));

  console.log(topEngagingUsers);

  return (
    <div className="  bg-black  ">
      <Header user={user} setIsOpen={setIsOpen} />
      <div className="grid grid-cols-3 gap-8 justify-between mx-auto max-w-screen-lg">
        {isOpen && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 z-50    ">
              <CreatePost user={user} setIsOpen={setIsOpen} />
            </div>
          </>
        )}
      </div>
      <div className="mx-auto mt-8 container">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

        <div className="grid grid-cols-2 gap-8">
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
