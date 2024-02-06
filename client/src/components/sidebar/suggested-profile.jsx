import { Link } from "react-router-dom";

export default function SuggestedProfile({ username, i }) {
  return (
    <div className="flex text-white flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${i}.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = `/images/avatars/default.png`;
          }}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button className="text-xs font-bold text-blue-medium" type="button">
        Follow
      </button>
    </div>
  );
}
