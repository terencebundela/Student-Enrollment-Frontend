import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainApp from './MainApp';
import Chatbot from './Chatbot';
import UserRecord from './UserRecord';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/userRecord" element={<UserRecord />} />
    </Routes>
  </Router>
);

export default App;
