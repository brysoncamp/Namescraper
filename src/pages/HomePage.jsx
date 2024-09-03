import React, { useRef, useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import LandingHook from "../components/LandingHook";
import Search from "../components/Search";
import GetStarted from "../components/GetStarted";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const textareaRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [exitY, setExitY] = useState(0);

  useEffect(() => {
    const rootElement = document.getElementById('root');

    const calculateExitPosition = () => {
      if (searchRef.current && rootElement) {
        const rect = searchRef.current.getBoundingClientRect();
        const rootTop = rootElement.getBoundingClientRect().top;
        const calculatedDistance = rect.top - rootTop + rootElement.scrollTop;
        const calculatedExitY = isSticky ? 0 : -(calculatedDistance - scrollAmount - 60);
        setExitY(calculatedExitY);
      }
    };

    const handleScroll = () => {
      if (searchRef.current) {
        const rect = searchRef.current.getBoundingClientRect();

        // Check if the search bar has reached the top
        if (rect.top <= 0 && !isSticky) {
          setIsSticky(true); // Mark the search bar as sticky
        } else if (rect.top > 0 && isSticky) {
          setIsSticky(false); // Reset sticky state if it goes below the top
        }

        // Update scroll amount
        setScrollAmount(rootElement.scrollTop);
      }
    };

    if (searchRef.current && rootElement) {
      calculateExitPosition();
    }

    // Add the scroll event listener to the #root element
    if (rootElement) {
      rootElement.addEventListener("scroll", handleScroll);
    }

    // Recalculate the exit position when the sticky state or scroll amount changes
    if (rootElement) {
      rootElement.addEventListener("scroll", calculateExitPosition);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (rootElement) {
        rootElement.removeEventListener("scroll", handleScroll);
        rootElement.removeEventListener("scroll", calculateExitPosition);
      }
    };
  }, [isSticky, scrollAmount]);

  const handleSearch = () => {
    const searchTerm = textareaRef.current?.value || ""; // Get the value from the textarea
    navigate(`/search?term=${encodeURIComponent(searchTerm)}`); // Navigate with the search term as a query parameter
  };

  const navigateToSearch = () => {
    navigate("/search");
  }

  return (
    <div className="center-vertically">

      <Topbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}  // Fade out to transparent on exit
        transition={{ duration: 0.25 }}
      >
        <LandingHook />
      </motion.div>
      <motion.div
        ref={searchRef}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        exit={{ y: exitY }} // Use pre-calculated exitY
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="sticky-search"
      >
        <Search textareaRef={textareaRef} enableMessages={true} handleSearch={handleSearch} navigateToSearch={navigateToSearch} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}  // Fade out to transparent on exit
        transition={{ duration: 0.25 }}
      >
        <GetStarted />
      </motion.div>

      <div style={{ height: '2000px' }}></div>
    </div>
  );
};

export default HomePage;
