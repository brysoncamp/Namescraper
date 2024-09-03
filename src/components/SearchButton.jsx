import React from "react";
import searchIcon from "../assets/vectors/search.svg";

const SearchButton = ({ buttonEnabled, handleSearch }) => (
  <div
    className={`search-button ${buttonEnabled ? "search-button-enabled" : ""}`}
    onClick={buttonEnabled ? handleSearch : null}
  >
    <img src={searchIcon} draggable="false" alt="search" />
    <p>Search</p>
  </div>
);

export default SearchButton;