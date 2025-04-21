import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css'; // Ensure Tailwind styles are imported
import { EventProvider } from './context/EventContext.jsx'; // Import Provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap entire app with BrowserRouter for routing */}
    <BrowserRouter>
      {/* Wrap App with EventProvider for global state */}
      <EventProvider>
        <App />
      </EventProvider>
    </BrowserRouter>
  </React.StrictMode>,
);