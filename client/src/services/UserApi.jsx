import { api } from "../constants/api";
import axios from "axios";

const UserService = {
  handleFollowUnFollow: async (user_id, postedUserId, filteredUsers) => {
    try {
      const token = localStorage.getItem("authToken");
      let response;
      if (!filteredUsers?.length > 0) {
        response = await axios.put(
          `${api}/follow`,
          { user_id, postedUserId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axios.put(
          `${api}/unfollow`,
          { user_id, postedUserId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.status === 200) {
        const result = response.data;
        return result;
      } else {
        console.error("Failed to Follow/Unfollow user");
        throw new Error("Failed to Follow/Unfollow user");
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      throw new Error("Error following/unfollowing user");
    }
  },
  GetSelectiveUserData: async (postedUserId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${api}/user/${postedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Error fetching user data");
    }
  },
  getAllUsers: async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${api}/allUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const users = response.data;
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error fetching users");
    }
  },
};
export default UserService;
