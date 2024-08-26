import React, { useRef } from "react";
import Topbar from "../components/Topbar";
import Search from "../components/Search";
import { motion } from "framer-motion";

const SearchPage = () => {
  const textareaRef = useRef(null);

  return (
    <div className="center-vertically">
      <Topbar />

      <motion.div>
      <Search textareaRef={textareaRef} enableMessages={false} />
      </motion.div>
    </div>
  );
};

export default SearchPage;
