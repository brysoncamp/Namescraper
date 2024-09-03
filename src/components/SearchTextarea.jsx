import React from "react";

const SearchTextarea = ({
  textareaRef,
  placeholder,
  textareaValue,
  setTextareaValue,
  setIsTyping,
  setPlaceholder,
  TextareaScrollClass,
  setTextareaScrollClass,
  setButtonEnabled,
  handleSearch
}) => {
  const maxLines = 5;

  const handleFocus = () => {
    setIsTyping(false); 
    setPlaceholder(""); 
    setTextareaScrollClass("search-input-scroll");

    if (textareaRef && textareaRef.current) {
      setTimeout(() => {
        const textarea = textareaRef.current;
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);

        const computedStyle = window.getComputedStyle(textarea);
        const maxHeightValueString = computedStyle.getPropertyValue('max-height');
        const maxHeightValue = parseInt(maxHeightValueString, 10);

        if (textarea.scrollHeight > maxHeightValue) {
          textarea.scrollTo({
            top: textarea.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 0);
    }
  };

  const handleBlur = () => {
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
    if (e.key === 'Enter' && textareaValue.trim()) {
      e.preventDefault();
      setButtonEnabled(false);
      handleSearch();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const lines = value.split('\n');
    const isContentDeleted = value.length < textareaValue.length;

    if (lines.length > maxLines) {
      setTextareaValue(lines.slice(0, maxLines).join('\n'));
    } else {
      setTextareaValue(value);
    }

    setButtonEnabled(value.trim() !== "");

    if (textareaRef && textareaRef.current) {
      const textarea = textareaRef.current;
      if (isContentDeleted) textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <textarea
      spellCheck="false"
      ref={textareaRef}
      className={`search-input ${TextareaScrollClass}`}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={textareaValue}
      rows="1"
      wrap="hard"
      maxLength="500"
    />
  );
};

export default SearchTextarea;
