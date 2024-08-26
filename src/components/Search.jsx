import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import sparkle from "../assets/vectors/sparkle.svg";
import search from "../assets/vectors/search.svg";

const Search = ({ textareaRef, enableMessages }) => {
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
  };

  const handleBlur = () => {
    setIsDescribeNext(true);
    setIsTyping(true);
  };

  const handleChange = (e) => {
    setTextareaValue(e.target.value); // Update the textarea value in state
    if (textareaRef && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
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
          className="search-input"
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange} // Use onChange instead of onInput
          value={textareaValue} // Controlled component
          rows="1"
        />
        <div className="search-button">
          <img src={search} draggable="false" alt="search" />
          <p>Search</p>
        </div>
      </div>
    </div>
  );
};

export default Search;
