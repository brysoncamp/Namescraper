import React from "react";
import Topbar from "../components/Topbar";
import LandingHook from "../components/LandingHook";
import Search from "../components/Search";
import GetStarted from "../components/GetStarted";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/search");
  };

  return (
    <div className="center-vertically">
      <motion.div layout transition={{ duration: 0.5, ease: "easeInOut" }}>
        <Topbar />
      </motion.div>
      
      <LandingHook />
      
      <motion.div layout transition={{ duration: 0.5, ease: "easeInOut" }}>
        <Search />
      </motion.div>
      
      <GetStarted />
      
      <button onClick={handleClick}>Go to Search</button>
    </div>
  );
};

export default HomePage;
