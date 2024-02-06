import { useEffect, useState } from "react";
import { api } from "../../constants/api";
import axios from "axios";
import User from "./user";
import Suggestions from "./suggestions";

export default function Sidebar({ user }) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get(`${api}/allUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const users = response.data;
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
    <div className="p-4 rounded-xl ml-4  bg-zinc-900 overflow-hidden h-96 ">
      <User userData={user} />
      <Suggestions loggedInUserDocId={user._id} userData={userData} />
    </div>
  );
}
