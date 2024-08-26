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
  const [distanceFromTop, setDistanceFromTop] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const rootElement = document.getElementById('root');

    const handleScroll = () => {
      if (searchRef.current) {
        const rect = searchRef.current.getBoundingClientRect();
        const rootTop = rootElement.getBoundingClientRect().top;

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
      const rect = searchRef.current.getBoundingClientRect();
      const rootTop = rootElement.getBoundingClientRect().top;
      setDistanceFromTop(rect.top - rootTop + rootElement.scrollTop);
    }

    // Add the scroll event listener to the #root element
    if (rootElement) {
      rootElement.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (rootElement) {
        rootElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isSticky]);

  const handleClick = () => {
    const searchTerm = textareaRef.current?.value || ""; // Get the value from the textarea
    navigate(`/search?term=${encodeURIComponent(searchTerm)}`); // Navigate with the search term as a query parameter
  };

  return (
    <div className="center-vertically">
      <Topbar />
      <motion.div
        initial={{ opacity: 1 }}
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
        exit={{ y: isSticky ? 0 : -(distanceFromTop - scrollAmount) }} // Move the div up by the distance from the top, or to 0 if sticky
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="sticky-search"
        style={{ position: "sticky", top: "0", zIndex: 10, backgroundColor: "white" }}
      >
        <Search textareaRef={textareaRef} enableMessages={true} />
      </motion.div>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}  // Fade out to transparent on exit
        transition={{ duration: 0.25 }}
      >
        <GetStarted />
      </motion.div>
      
      <button onClick={handleClick}>Go to Search</button>
      
      {/* Spacer to allow scrolling */}
      <div style={{ height: '2000px' }}></div>

      <button onClick={handleClick}>Go to Search</button>
    </div>
  );
};

export default HomePage;
