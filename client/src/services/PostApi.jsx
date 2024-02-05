import { api } from "../constants/api";
import axios from "axios"; // Import axios

const apiService = {
  createPost: async (postData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${api}/createpost`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error creating post:", errorText);
        throw new Error(
          `Error creating post: ${errorText || response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Error creating post");
    }
  },

  getPost: async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${api}/allpost`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const posts = response.data.posts;
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Error fetching posts");
    }
  },

  addComment: async (docId, comment, postedBy) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        api + "/comment",
        {
          text: comment,
          postId: docId,
          postedBy: postedBy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const result = response.data;
        return result;
      } else {
        console.error("Failed to add comment");
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      console.error("Axios Error Details:", error.response);
      throw new Error("Error adding comment");
    }
  },
  toggleLikes: async (docId, likerId) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.put(
        api + "/toggleLike",
        {
          docId: docId,
          likerId: likerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const result = response.data;
        return result;
      } else {
        console.error("Failed to like post");
        throw new Error("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      throw new Error("Error liking post");
    }
  },
  handleDelete: async (docId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${api}/deletepost/${docId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = response.data;
        return result;
      } else {
        console.error("Failed to delete like");
        throw new Error("Failed to delete like");
      }
    } catch (error) {
      console.error("Error deleting like:", error);
      throw new Error("Error deleting like");
    }
  },
  handleFollowUnFollow: async (user_id, postedUserId, filteredUsers) => {
    try {
      const token = localStorage.getItem("authToken");
      let response;
      if (!filteredUsers.length > 0) {
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
};
export default apiService;
