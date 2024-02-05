import { Link } from "react-router-dom";
import { IoEllipsisHorizontal, IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import apiService from "../../services/PostApi";
import UserService from "../../services/UserApi";

export default function Header({
  username,
  docId,
  setPosts,
  user,
  postedUserId,
}) {
  const [isOpen, setOpen] = useState(false);
  const [individualData, setindividualData] = useState([]);
  const handleDeletePost = async (docId) => {
    try {
      setPosts((prevPosts) => {
        const newPosts = prevPosts.filter((post) => post._id !== docId);
        return newPosts;
      });
      const result = await apiService.handleDelete(docId);
      if (result.status === 200) {
        alert("Successfully deleted post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const handleFollowUser = async (user_id) => {
    try {
      const result = await UserService.handleFollowUnFollow(
        user_id,
        postedUserId,
        filteredUsers
      );
      if (result.status === 200) {
        alert("You have Followed");
      }
    } catch (error) {
      console.error("Error Following User ", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await UserService.GetSelectiveUserData(postedUserId);
        setindividualData(result);
      } catch (error) {
        console.error("Error Fetching User Data ", error);
      }
    };

    fetchData();
  }, [postedUserId, individualData]);
  const filteredUsers = individualData?.user?.Followers.filter(
    (userFollowing) => userFollowing === user._id
  );
  return (
    <div className="flex border-b justify-between border-gray-900  h-4 p-4  py-10">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full border border-gray-900 w-12  flex mr-3"
            src={`/images/avatars/orwell.jpg`}
            alt={`${username} profile picture`}
          />
          <p className="font-bold  text-white tracking-wide ">
            {username.slice(0, 10)}
          </p>
        </Link>
        <button
          onClick={() => handleFollowUser(user._id, postedUserId)}
          className="ml-3 text-[0.8rem] border px-6 tracking-wide py-1 bg-white bg-opacity-5 hover:bg-opacity-10 text-white"
        >
          {filteredUsers?.length > 0 ? "Following" : "Follow"}{" "}
        </button>
      </div>
      <div className="text-white  relative flex items-center">
        <button
          className="text-lg"
          onClick={() => setOpen((pervState) => setOpen(!pervState))}
          style={{ outline: "none" }}
        >
          <IoEllipsisHorizontal />
        </button>
        {isOpen && (
          <button
            onClick={() => handleDeletePost(docId)}
            className="flex items-center text-black absolute  border-gray-400 bg-white bg-opacity-90 right-0 top-2 font-semibold px-6 py-2 rounded shadow-md hover:text-zinc-700"
          >
            <IoTrashOutline className="mr-2" />
            Delete
          </button>
        )}{" "}
      </div>
    </div>
  );
}
