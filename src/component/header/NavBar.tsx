import React from "react";

// import { FaUser } from "react-icons/fa";
import { BsBookmarkPlusFill } from "react-icons/bs";

import { NavLink } from "react-router-dom";

import DateRange from "./DateRange";

const NavBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-rose-800 ">
      <nav className=" flex flex-row justify-between items-center mobile:px-2 md:px-10 py-2">
        <div className=" px-2 py-[.125rem] md:rounded-md mobile:rounded mobile:text-lg md:text-xl text-rose-900 bg-amber-300 ">
          <NavLink to="/">TMDb</NavLink>
        </div>

        <div>
          <DateRange />
        </div>

        <div>
          <ul className="flex flex-row gap-4">
            <li className="flex items-center ">
              <NavLink to="/watchlist">
                <div className="text-lg relative flex flex-row items-center justify-between gap-1 text-white">
                  <BsBookmarkPlusFill />{" "}
                  <p className="text-lg hidden sm:block">Watchlist</p>
                </div>
              </NavLink>
            </li>
            {/* <li className="flex flex-row">
              <NavLink to="/login">
                <div className="text-lg flex flex-row items-center justify-between gap-0 ">
                  <FaUser />
                  <span className="text-lg">User</span>
                </div>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
