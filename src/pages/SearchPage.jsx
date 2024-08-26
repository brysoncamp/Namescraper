import React from "react";
import Topbar from "../components/Topbar";
import Search from "../components/Search";
import { motion } from "framer-motion";

const SearchPage = () => {
  return (
    <div className="center-vertically">
      <motion.div layout transition={{ duration: 0.5, ease: "easeInOut" }}>
        <Topbar />
      </motion.div>
      
      <motion.div layout transition={{ duration: 0.5, ease: "easeInOut" }}>
        <Search />
      </motion.div>
    </div>
  );
};

export default SearchPage;