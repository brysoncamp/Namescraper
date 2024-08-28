import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import sparkle from "../assets/vectors/sparkle.svg";
import search from "../assets/vectors/search.svg";

const Search = ({ textareaRef, enableMessages, handleSearch }) => {
  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);
  const [isTyping, setIsTyping] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(
    "Describe your business idea."
  );
  const [shownMessages, setShownMessages] = useState([]);
  const [isDescribeNext, setIsDescribeNext] = useState(true);
  const [textareaValue, setTextareaValue] = useState("");
  //const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [TextareaScrollClass, setTextareaScrollClass] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const maxLines = 5;

  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get("term") || "";
    setTextareaValue(term);
  }, [location.search]);

  const messages = [
    "A mobile app that tracks daily habits.",
    "An online store for handmade crafts.",
    "A blog about personal finance tips.",
  ];

  const getRandomMessage = () => {
    const availableMessages = messages.filter(
      (_, index) => !shownMessages.includes(index)
    );
    const randomIndex = Math.floor(Math.random() * availableMessages.length);
    const selectedMessage = availableMessages[randomIndex];
    const selectedMessageIndex = messages.indexOf(selectedMessage);

    if (shownMessages.length >= Math.floor(messages.length / 2)) {
      setShownMessages([selectedMessageIndex]);
    } else {
      setShownMessages([...shownMessages, selectedMessageIndex]);
    }

    return selectedMessage;
  };

  useEffect(() => {
    if (!enableMessages) return;

    const handleTyping = () => {
      if (!isTyping) return;

      if (!placeholder && !isDeleting) {
        const message = isDescribeNext
          ? "Describe your business idea."
          : getRandomMessage();
        setCurrentMessage(message);
      }

      const updatedText = isDeleting
        ? currentMessage.substring(0, placeholder.length - 1)
        : currentMessage.substring(0, placeholder.length + 1);

      setPlaceholder(updatedText);

      if (!isDeleting && updatedText === currentMessage) {
        const pauseTime = isDescribeNext ? 1500 : 500;
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setIsDescribeNext(loopNum % 2 !== 0);
        setTypingSpeed(50);
      } else if (isDeleting) {
        setTypingSpeed(15);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [
    enableMessages,
    placeholder,
    isDeleting,
    loopNum,
    typingSpeed,
    isTyping,
    isDescribeNext,
    currentMessage,
  ]);

  const handleFocus = () => {
    setIsTyping(false);
    setPlaceholder("");
    setTextareaScrollClass("search-input-scroll");

    if (textareaRef && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleBlur = () => {
    setIsDescribeNext(true);
    setIsTyping(true);
    setTextareaScrollClass("");

    if (textareaRef && textareaRef.current) {
      const textarea = textareaRef.current;
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
      textarea.style.height = `${lineHeight + 32}px`;

      textarea.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && buttonEnabled) {
      e.preventDefault(); // Prevent the default action (new line in textarea)
      handleSearch();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const lines = value.split('\n');
  
    // Enforce maximum number of lines
    if (lines.length > maxLines) {
      // Trim excess lines
      setTextareaValue(lines.slice(0, maxLines).join('\n'));
    } else {
      setTextareaValue(value);
      //setTextareaValue(value);
    }
  
    // Update button enabled status based on textarea content
    setButtonEnabled(value.trim() !== "");
  
    // Adjust textarea height dynamically
    if (textareaRef && textareaRef.current) {
      const textarea = textareaRef.current;
      //textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  

  return (
    <div className="search-container">
      <div className="search">
        <img className="search-icon" src={sparkle} draggable="false" alt="sparkle" />
        <textarea
          spellCheck="false"
          ref={textareaRef}
          className={`search-input ${TextareaScrollClass}`}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange} // Use onChange instead of onInput
          onKeyDown={handleKeyDown}
          value={textareaValue} // Controlled component
          rows="1" // each row is 56 chars
          wrap="hard"
          maxLength="500"
        />
        <div className={`search-button ${buttonEnabled ? "search-button-enabled": ""}`} onClick={buttonEnabled ?  handleSearch : null}>
          <img src={search} draggable="false" alt="search" />
          <p>Search</p>
        </div>
      </div>
    </div>
  );
};

export default Search;
