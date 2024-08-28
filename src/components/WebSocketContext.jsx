// WebSocketContext.js (or WebSocketProvider.jsx)
import React, { createContext, useState, useEffect, useContext } from 'react';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [totalMessage, setTotalMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [prompt, setPrompt] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        console.log('Connected to WebSocket');
        setConnectionStatus('Connected');
        if (prompt) {
          ws.send(JSON.stringify({ action: 'search', prompt }));
        }
      };

      const decodeHTMLEntities = (text) => {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
      };

      ws.onmessage = (event) => {
        console.log('Raw data from server:', event.data);

        try {
          const decodedMessage = decodeHTMLEntities(event.data);
          console.log('Decoded message:', decodedMessage);

          const message = JSON.parse(decodedMessage);
          console.log('Parsed message:', message);

          if (message && message.content) {
            setTotalMessage((prev) => prev + message.content);
            console.log('Total message:', totalMessage);
          } else {
            console.warn('Message does not have content:', message);
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from WebSocket');
        setConnectionStatus('Disconnected');
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return () => {
        ws.close(); // Cleanup on unmount
      };
    }
  }, [ws, prompt]);

  const startConnection = () => {
    const newWs = new WebSocket('wss://ws.namescraper.com/development');
    setWs(newWs);
  };

  const updatePrompt = (newPrompt) => {
    setPrompt(newPrompt);
    if (ws) {
      ws.send(JSON.stringify({ action: 'search', prompt: newPrompt }));
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ totalMessage, connectionStatus, updatePrompt, startConnection }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// Export the useWebSocket hook for convenience
export const useWebSocket = () => useContext(WebSocketContext);