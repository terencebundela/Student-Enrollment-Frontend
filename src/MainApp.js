// MainApp.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './MainApp.css';
class MainApp extends Component {
  render() {
    return (
      <div className="main-app">
        <h1>Enter into Student Info System</h1>
        <Link to="/chatbot"> {/* Use Link to navigate to the chatbot page */}
          <button>Enroll Now!</button>
        </Link>
      </div>
    );
  }
}

export default MainApp;
