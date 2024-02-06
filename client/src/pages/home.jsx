import { useEffect, useState } from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import { useUser } from "../context/user";
import CreatePost from "../components/post/createPost";

export default function Home({}) {
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-zinc-950  ">
        <Header user={user} setIsOpen={setIsOpen} />
        <div className="grid grid-cols-3 gap-8 justify-between mx-auto max-w-screen-lg">
          {isOpen && (
            <>
              <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 z-50    ">
                <CreatePost user={user} setIsOpen={setIsOpen} />
              </div>
            </>
          )}

          <Timeline user={user} />

          <Sidebar user={user} />
        </div>
      </div>
    </>
  );
}
