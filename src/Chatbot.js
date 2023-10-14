import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Chatbot.css";

const timeSlots = {
  morning: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM"],
  afternoon: ["1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"],
  evening: ["5:00 PM - 7:00 PM", "7:00 PM - 9:00 PM"],
};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [stage, setStage] = useState(0);
  const [showDots, setShowDots] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [_selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const showData = () => {
      setTimeout(() => {
        setShowDots(false);
        handleBotResponse("Hello, Welcome to the student info system!", "bot");
        setTimeout(() => {
          handleBotResponse("Click 'Got It' to continue.", "bot");
        }, 1000); // Add a delay of 1 second before displaying the second message
      }, 3000); // Initial 3-second delay
    }
    return () => showData();
  }, []);
  

  const handleBotResponse = (text, type = "bot") => {
    setMessages((prevMessages) => [...prevMessages, { type, text }]);
  };

  const handleGotItButtonClick = () => {
    handleBotResponse("Pick a date from the calendar:", "bot");
    setStage(1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleBotResponse(`Selected Date: ${date.toDateString()}`, "bot");
    handleBotResponse("Now, pick a time slot:", "bot");
    setStage(2);
  };

  const handleTimeSlotSelect = (selectedSlot) => {
    setSelectedTimeSlot(selectedSlot);
    handleBotResponse(`Selected Time Slot: ${selectedSlot}`, "bot");
    handleBotResponse("Please enter your name:", "bot");
    setStage(3);
  };

  const handleAgeChange = (event) => {
    const ageValue = event.target.value;
    const ageNumber = ageValue === "" ? 0 : parseInt(ageValue, 10);
  
    setUserAge(ageNumber);
    handleBotResponse("Thank you. In 5 seconds, the bot will exit.", "bot");
    startCountdown(5, ageNumber); // Passed ageNumber as an argument
  };
  
  const startCountdown = (countdown, ageNumber) => {
    setTimeout(() => {
      if (countdown > 1) {
        handleBotResponse(`${countdown - 1}...`, "bot");
        startCountdown(countdown - 1, ageNumber); // Pass ageNumber in the recursive call
      } else {
        console.log(ageNumber === 0 ? "Please select your age" : ageNumber);
        navigate('/userRecord', { state: { userName, userAge: ageNumber } });
      }
    }, 1000);
  };
  

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {showDots && <div className="chatbot-message bot">...</div>}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              message.type === "bot" ? "bot" : "user"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        {stage === 0 && (
          <button
            onClick={handleGotItButtonClick}
            className="got-it-button"
          >
            Got it!
          </button>
        )}
        {stage === 1 && (
          <div className="user-message">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select a date"
              className="date-picker"
            />
          </div>
        )}
        {stage === 2 && (
          <div className="user-message">
            {Object.keys(timeSlots).map((slot) => (
              <button
                key={slot}
                className="time-slot-button"
                onClick={() => handleTimeSlotSelect(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
        {stage === 3 && (
          <div className="user-message">
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        )}
        {stage === 3 && (
          <div className="user-message">
            <select value={userAge} onChange={handleAgeChange}>
              <option value="">Select your age</option>
              {Array.from({ length: 23 }, (_, i) => i + 18).map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
