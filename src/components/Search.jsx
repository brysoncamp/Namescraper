import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchButton from "./SearchButton";
import TypingAnimation from "./TypingAnimation";
import SearchTextarea from "./SearchTextarea";
import sparkleIcon from "../assets/vectors/sparkle.svg";

const Search = ({ textareaRef, enableMessages, handleSearch }) => {
  const [placeholder, setPlaceholder] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [TextareaScrollClass, setTextareaScrollClass] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get("term") || "";
    setTextareaValue(term);
  }, [location.search]);

  return (
    <div className="search-container">
      <div className="search">
        <img className="search-icon" src={sparkleIcon} draggable="false" alt="sparkle" />
        <SearchTextarea
          textareaRef={textareaRef}
          placeholder={placeholder}
          textareaValue={textareaValue}
          setTextareaValue={setTextareaValue}
          setIsTyping={setIsTyping}
          setPlaceholder={setPlaceholder}
          TextareaScrollClass={TextareaScrollClass}
          setTextareaScrollClass={setTextareaScrollClass}
          setButtonEnabled={setButtonEnabled}
          handleSearch={handleSearch}
        />
        <SearchButton buttonEnabled={buttonEnabled} handleSearch={handleSearch} />
        {isTyping && (
          <TypingAnimation
            enableMessages={enableMessages}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
          />
        )}
      </div>
    </div>
  );
};

export default Search;