import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { DEFAULT_IMAGE_PATH } from "../constants/paths";
import { useState } from "react";

export default function Header({ user, setIsOpen }) {
  const navigate = useNavigate();
  return (
    <header className="h-20 pb-1 border-b border-gray-800 mb-8">
      <div className="container mx-auto max-w-screen-lg   h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link
                to={ROUTES.DASHBOARD}
                style={{ outline: "none" }}
                aria-label="Instagram logo"
              >
                <img
                  src="/images/logo1.png"
                  alt="Instagram"
                  className="mt-2 opacity-85  px-5 w-3/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <div
                  onClick={() => setIsOpen(true)}
                  className="p-1.5 rounded-lg mr-6 bg-gray-500  bg-opacity-40   "
                >
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-2 h-7  font-semibold  text-xl rounded-md text-black bg-white  "
                  >
                    +
                  </button>
                </div>

                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    className="w-8 mr-6 text-white cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => {
                    localStorage.clear();
                    navigate(ROUTES.LOGIN);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      localStorage.clear();
                      navigate(ROUTES.LOGIN);
                    }
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-white cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                {user && (
                  <div className="flex items-center cursor-pointer">
                    <Link to={`/p/${user?.Username}`}>
                      <img
                        className="rounded-full  w-20  flex"
                        src={`/images/avatars/raphael.jpg`}
                        alt={`${user?.Username} profile`}
                        onError={(e) => {
                          e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                      />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
