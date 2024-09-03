import { useState, useEffect } from "react";

const TypingAnimation = ({ enableMessages, placeholder, setPlaceholder }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);
  const [currentMessage, setCurrentMessage] = useState(
    "Describe your business idea."
  );
  const [shownMessages, setShownMessages] = useState([]);
  const [isDescribeNext, setIsDescribeNext] = useState(true);

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
    isDescribeNext,
    currentMessage,
  ]);

  return null;
};

export default TypingAnimation;
