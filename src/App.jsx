import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { WebSocketProvider } from "./components/WebSocketContext";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";

//import { Amplify } from 'aws-amplify';
//import awsconfig from './aws-exports'; 



const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/search" element={
          <WebSocketProvider>
            <SearchPage />
          </WebSocketProvider>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
