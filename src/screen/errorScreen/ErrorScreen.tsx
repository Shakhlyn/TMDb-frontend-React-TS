import React from "react";
import { Link } from "react-router-dom";

import { FaFaceSurprise } from "react-icons/fa6";

const ErrorScreen: React.FC = () => {
  return (
    <div className=" h-screen">
      <div className="flex flex-col items-center">
        <h1 className=" text-6xl font-extrabold text-yellow-100 mb-4 mt-32 flex flex-row gap-4 ">
          <div>Ooops...</div>
          <FaFaceSurprise className=" text-red-600" />
        </h1>
        <h2 className="text-4xl font-bold text-red-600 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-lg text-gray-400">
          The page you are looking for does not exist.
        </p>
        <Link
          className="mb-8 mt-20 text-2xl font-semibold px-6 py-3 rounded text-black bg-yellow-500 "
          to="/"
        >
          <h2>Go To Homepage</h2>
        </Link>
      </div>
    </div>
  );
};

export default ErrorScreen;
