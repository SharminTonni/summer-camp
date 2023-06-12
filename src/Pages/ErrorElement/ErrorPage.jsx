import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="mt-4 text-center">
      <Link to="/">
        <button className="btn my-2 btn-outline bg-red-600 text-white">
          Back to Home
        </button>
      </Link>
      <img
        src="https://freefrontend.com/assets/img/html-funny-404-pages/HTML-Yeti-404-Page.gif"
        alt=""
      />
    </div>
  );
};

export default ErrorPage;
