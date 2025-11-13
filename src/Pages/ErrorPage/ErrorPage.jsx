import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <img
        src="https://i.ibb.co.com/yFDBLTCg/error.png"
        alt="404 Not Found"
        className="w-64 sm:w-80 md:w-96"
      />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-900 mt-6">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 text-lg sm:text-xl mt-3 max-w-md">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn btn-primary mt-6 px-8 py-3"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
