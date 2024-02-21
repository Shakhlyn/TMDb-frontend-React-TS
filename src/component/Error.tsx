import React from "react";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <div>
        <h1>Ooops! Something went wrong</h1>
      </div>
      <div>
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {message}</span>
      </div>
    </div>
  );
};

export default Error;
