import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Topbar = () => {
  return (
    <div className="topbar">
      <Link to="/" className="logo-text">
        <span className="logo-text-highlight">
          n<span className="logo-hide">ame</span>
        </span>
        <span className="logo-hide">scraper</span>
        <span className="asterisk">*</span>
      </Link>

      <div className="signup-button">Sign up</div>
    </div>
  );
};

export default Topbar;
