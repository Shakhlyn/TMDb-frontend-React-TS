import React from "react";

import { FaUser } from "react-icons/fa";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

import SearchBox from "./SearchBox";
import DateRange from "./DateRange";

const NavBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-rose-800 ">
      <nav className=" flex flex-row justify-between items-center bg-darkGray mobile:px-2 md:px-10 py-2">
        <div className=" px-2 py-[.125rem] rounded-md text-xl text-rose-900 bg-amber-300 ">
          <Link to="/">TMDb</Link>
        </div>

        <div>
          <SearchBox />
        </div>
        <div>
          <DateRange />
        </div>

        <div>
          <ul className="flex flex-row gap-4">
            <li className="flex items-center ">
              <Link to="/watchlist">
                <div className="text-lg relative flex flex-row items-center justify-between gap-1 text-white">
                  <BsBookmarkPlusFill />{" "}
                  <span className="text-lg">Watchlist</span>
                </div>
              </Link>
            </li>
            <li className="flex flex-row">
              <Link to="/login">
                <div className="text-lg flex flex-row items-center justify-between gap-0 ">
                  <FaUser />
                  <span className="text-lg">User</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
