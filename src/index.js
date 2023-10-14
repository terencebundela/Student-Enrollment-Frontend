import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './Routes'; // Import the Routes component


const rootElement = document.getElementById('root'); // Get the root container

const root = ReactDOM.createRoot(rootElement); // Create a root using createRoot

root.render(
  <React.StrictMode>
    <Routes /> {/* Render the Routes component */}
  </React.StrictMode>
);
