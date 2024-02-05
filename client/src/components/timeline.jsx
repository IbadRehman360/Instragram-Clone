import React, { useEffect, useState } from "react";
import apiService from "../services/PostApi";
import Post from "./post";
export default function Timeline({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await apiService.getPost();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="container col-span-2">
      {posts
        ? posts.map((post) => (
            <Post
              key={post._id}
              user={user}
              setPosts={setPosts}
              content={post}
            />
          ))
        : null}
    </div>
  );
}
