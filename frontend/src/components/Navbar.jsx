import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();

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

        <div className="flex flex-wrap justify-evenly w-1/5">
          <button className="bg-blue-500 text-white h-8 m-2 w-16 rounded-lg">
            Login
          </button>
          <button className="bg-blue-500 text-white h-8 m-2 w-16 rounded-lg">
            Signup
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
