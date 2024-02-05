import { useState } from "react";
import apiService from "../../services/PostApi";

const CreatePost = ({ setIsOpen, user }) => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [error, setError] = useState({});
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setPostData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postData.title || !postData.description || !postData.file) {
      alert("Please provide a title and description and a image file");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("description", postData.description);
      formData.append("fileName", postData.file.name);
      formData.append("fileType", postData.file.type);
      formData.append("id", user._id);

      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const response = await apiService.createPost(formDataObject);
      console.log("Post created successfully:", response.data);
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 w-[30rem] bg-gray-50 py-5 px-8 rounded-xl shadow-md">
      <div className="flex justify-between mb-4   ">
        <h2 className="text-2xl font-semibold  ">Upload Post</h2>
        <button
          className="text-gray-500 font-semibold text-lg mb-0.5 "
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white pt-8 px-6 border-2 border-gray-100  shadow-md rounded-xl">
          <div className="mb-4">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title of the post"
              className="w-full border border-gray-300 p-4 rounded-md"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <textarea
              id="description"
              placeholder="Description of the post"
              name="description"
              className="w-full border border-gray-300 p-4  rounded-md"
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mb-8 border-t pt-4">
            <input
              type="file"
              id="file"
              name="file"
              className="w-full border border-gray-300  rounded-md p-3 "
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button
            onClick={() => setIsOpen(false)}
            className="text-red px-4 py-2 rounded-md text-red-500 mr-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
