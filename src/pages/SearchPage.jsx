import React, { useRef, useContext } from 'react';
import Topbar from '../components/Topbar';
import Search from '../components/Search';
import { WebSocketContext } from '../components/WebSocketContext'; // Only import the context
import PromptOutput from '../components/PromptOutput';

const SearchPage = () => {
  const textareaRef = useRef(null);
  const { updatePrompt, startConnection } = useContext(WebSocketContext);

  const handleSearch = () => {
    const userPrompt = textareaRef.current.value;
    updatePrompt(userPrompt);  // Update the prompt via WebSocket context
    startConnection();  // Start the WebSocket connection
  };

  return (
    <div className="center-vertically">
      <Topbar />
      <Search
        textareaRef={textareaRef}
        enableMessages={false}
        handleSearch={handleSearch}
      />
      <PromptOutput />
    </div>
  );
};

export default SearchPage;
