import { Link } from "react-router-dom";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";

export default function User({ userData }) {
  return (
    <Link to={`/p/${12}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={`/images/avatars/steve.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
      </div>
      <div className="col-span-3 text-white">
        <p className="font-bold text-sm">{userData.username}</p>
        <p className="text-sm">{userData.fullName} </p>
      </div>
    </Link>
  );
}
