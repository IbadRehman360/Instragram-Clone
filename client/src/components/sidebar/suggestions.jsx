import SuggestedProfile from "./suggested-profile";

export default function Suggestions({ userData, loggedInUserDocId }) {
  return (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold  text-gray-100">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {userData.users.map((userData, i) => (
          <SuggestedProfile
            key={userData._id + userData._id}
            profilexDocId={userData._id}
            username={userData.Username}
            profileId={userData._id}
            loggedInUserDocId={loggedInUserDocId}
            i={i + 1}
          />
        ))}
      </div>
    </div>
  );
}
