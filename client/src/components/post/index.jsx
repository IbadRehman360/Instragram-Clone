import { useRef } from "react";
import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";

export default function Post({ content, user, setPosts, i }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="rounded-xl col-span-4 border bg-zinc-900 border-zinc-800 mb-12">
      <Header
        i={i}
        docId={content._id}
        setPosts={setPosts}
        username={content.PostedBy.Name}
        postedUserId={content.PostedBy._id}
        user={user}
      />
      <Image src={content.Photo} caption={content.Title} />
      <Actions
        docId={content._id}
        likedBy={user._id}
        totalLikes={content.Likes.length}
        handleFocus={handleFocus}
      />
      <Footer caption={content.Title} username={content.PostedBy.Name} />
      <Comments
        docId={content._id}
        comments={content.Comments}
        timestamp={content.createdAt}
        postedBy={user._id}
        commentInput={commentInput}
      />
    </div>
  );
}
