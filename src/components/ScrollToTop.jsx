import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get current path

  useEffect(() => {
    document.body.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]); // Trigger scroll when pathname changes

  return null; // No need to render anything
};

export default ScrollToTop;
