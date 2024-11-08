import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ navigationTop }) => {
    return (
        <nav style={{ top: `${navigationTop}px` }}>
            {/* Add your navbar content here */}
            <Link className="nav-link nav-link-selected" to="/search/results">Results</Link>
            <Link className="nav-link" to="/search/filters">Filters</Link>
            <Link className="nav-link" to="/search/results">Lists</Link>
            <Link className="nav-link" to="/search/filters">History</Link>
        </nav>
    ); 
};

export default Navigation;