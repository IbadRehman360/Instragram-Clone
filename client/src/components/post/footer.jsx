import PropTypes from "prop-types";

export default function Footer({ caption, username }) {
  return (
    <div className="p-4 px-5  pt-1 pb-1">
      <span className="mr-3 text-lg text-gray-200 font-semibold ">
        {username}
      </span>
      <span className="italic   text-gray-300">{caption}</span>
    </div>
  );
}
