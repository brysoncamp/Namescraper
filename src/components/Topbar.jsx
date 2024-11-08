import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchAuthSession } from 'aws-amplify/auth'

const Topbar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
        console.log(authToken);
        setIsAuthenticated(!!authToken); // Set to true if authToken exists, false otherwise
      } catch (error) {
        console.error('Error fetching auth session:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div className="topbar">
      <Link to="/" className="logo-text">
        <span className="logo-text-highlight">
          n<span className="logo-hide">ame</span>
        </span>
        <span className="logo-hide">scraper</span>
        <span className="asterisk">*</span>
      </Link>
      <Link to="/account" className="signup-button">
        {isAuthenticated ? 'Account' : 'Sign In'}
      </Link>
    </div>
  );
};

export default Topbar;
