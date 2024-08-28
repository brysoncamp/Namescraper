// PromptOutput.js
import React from 'react';
import { useWebSocket } from './WebSocketContext'; // Adjust path as needed

const PromptOutput = () => {
  const { totalMessage } = useWebSocket();

  return (
    <div className="prompt-output">
      <p>Output:</p>
      <pre>{totalMessage}</pre>
    </div>
  );
};

export default PromptOutput;
