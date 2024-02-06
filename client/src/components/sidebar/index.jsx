import { useEffect, useState } from "react";
import User from "./user";
import Suggestions from "./suggestions";
import UserService from "../../services/UserApi";
import Header from "../header";

export default function Sidebar({ user }) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await UserService.getAllUsers();
        setUserData(users);
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching User Data ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <></>;
  }
  console.log(userData);
  return (
    <div className="p-4 rounded-xl ml-4 bg-zinc-900 overflow-hidden h-80 justify-end min-h-content">
      <User userData={user} />
      <Suggestions loggedInUserDocId={user._id} userData={userData} />
    </div>
  );
}
