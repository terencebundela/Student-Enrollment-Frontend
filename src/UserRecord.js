import React from 'react';
import { useLocation } from 'react-router-dom';

const UserRecord = () => {
  const location = useLocation();
  const { userName, userAge } = location.state;

  console.log("Received data in UserRecord:", userName, userAge);

  // Check if userName and userAge are defined
  if (!userName || !userAge) {
    return (
      <div className="page-3">
        <div className="page-3-text">
          User information is missing.
        </div>
        <div className="page-3-content">
          Please go back and provide your information.
        </div>
      </div>
    );
  }

  return (
    <div className="page-3">
      <div className="page-3-text">
        Your name {userName} aged {userAge} has been added to the student system.
      </div>
      <div className="page-3-content">
        You may now exit.
      </div>
    </div>
  );
}

export default UserRecord;
