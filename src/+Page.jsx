import React from 'react';
import App from './App';

// Export the Page component
export { Page };

function Page(pageContext) {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
