import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
// Navigate to specific path

function Navbar() {
  const navigate = useNavigate();
  let location = useLocation();
  let state = useContext(NoteContext);
  let { getNote } = state;

  let handleLogin = () => {
    navigate("/login");
  };
  let handleSignup = () => {
    navigate("/signup");
  };
  let handleLogout = () => {
    localStorage.removeItem("token");

    getNote();
    navigate("/");
  };

  // useEffect(() => {
  //   // Google Analytics
  //   console.log(location.pathname);
  // }, [location]);
  return (
    <>
      <div className=" duration-500 flex flex-wrap justify-between bg-zinc-700 overflow-y-auto overflow-x-auto mb-2 py-6  px-4 rounded-b-3xl border-b-3xl border-b-8 border-blue-500">
        <div className="flex flex-wrap justify-between w-1/4 mt-2  text-rose-500">
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "text-blue-500" : ""
            } text-lg`}
          >
            iNoteBook
          </Link>
          <Link
            to="/notes"
            className={`text-rose-500 ${
              location.pathname === "/notes" ? "active" : ""
            }`}
          >
            Notes
          </Link>

          <Link
            to="/about"
            className={` ${
              location.pathname === "/about" ? "text-blue-400" : ""
            } `}
          >
            About
          </Link>
        </div>

        {!localStorage.getItem("token") ? (
          <div className="flex flex-wrap justify-evenly w-1/5">
            <button
              className="bg-blue-500 text-white h-8 m-2 w-16 rounded-lg"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="bg-blue-500 text-white h-8 m-2 w-16 rounded-lg"
              onClick={handleSignup}
            >
              Signup
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-evenly w-1/5">
            <button
              className="bg-blue-500 text-white h-8 m-2 w-16 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
