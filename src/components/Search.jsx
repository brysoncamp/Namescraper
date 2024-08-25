import React, { useState, useEffect, useRef } from "react";

import sparkle from "../assets/vectors/sparkle.svg";
import search from "../assets/vectors/search.svg";

const Search = () => {
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

  const textareaRef = useRef(null);

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
    const handleTyping = () => {
      if (!isTyping) return;

      // Set the current message only when starting to type a new message
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
        setIsDescribeNext(loopNum % 2 !== 0); // Alternate correctly after the first loop
        setTypingSpeed(50);
      } else if (isDeleting) {
        setTypingSpeed(15);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [
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
    setIsDescribeNext(true); // Ensure the next message is "Describe your business idea."
    setIsTyping(true);
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on content
  };

  return (
    <div className="search-container">
        <div className="search">
            <img className="search-icon" src={sparkle} draggable="false"/>
            <textarea
                ref={textareaRef}
                className="search-input"
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={handleInput}
                rows="1"
            />
            <div className="search-button">
              <img src={search} draggable="false" />
              <p>Search</p>
            </div>
        </div>
    </div>
    
  );
};

export default Search;
