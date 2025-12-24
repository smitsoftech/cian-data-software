import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  // Check user’s previous choice
  useEffect(() => {
    const cookieChoice = localStorage.getItem("cookieConsent");
    if (!cookieChoice) {
      setVisible(true);
    }
  }, []);

  // Handle user actions
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  if (Cart)

  return (
    <StyledWrapper>
      <div className="overlay">
        <div className="card">
          <svg
            version="1.1"
            id="cookieSvg"
            x="0px"
            y="0px"
            viewBox="0 0 122.88 122.25"
            xmlSpace="preserve"
          >
            <g>
              <path d="M101.77,49.38c2.09,3.1,4.37,5.11,6.86,5.78..." />
            </g>
          </svg>

          <p className="cookieHeading">We use cookies</p>
          <p className="cookieDescription">
            This website uses cookies to ensure you get the best experience.
          </p>

          <div className="buttonContainer">
            <button className="acceptButton" onClick={handleAccept}>
              Allow
            </button>
            <button className="declineButton" onClick={handleDecline}>
              Decline
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0; /* covers full screen */
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    width: 320px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px 30px;
    gap: 15px;
    border-radius: 16px;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
    animation: popIn 0.4s ease-in-out;
  }

  @keyframes popIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  #cookieSvg {
    width: 50px;
  }

  #cookieSvg g path {
    fill: rgb(97, 81, 81);
  }

  .cookieHeading {
    font-size: 1.3em;
    font-weight: 700;
    color: rgb(26, 26, 26);
  }

  .cookieDescription {
    text-align: center;
    font-size: 0.9em;
    font-weight: 500;
    color: rgb(90, 90, 90);
  }

  .buttonContainer {
    display: flex;
    gap: 15px;
    margin-top: 10px;
  }

  .acceptButton,
  .declineButton {
    width: 90px;
    height: 35px;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: 0.2s;
  }

  .acceptButton {
    background-color: #7b57ff;
    color: #fff;
  }

  .acceptButton:hover {
    background-color: #9173ff;
  }

  .declineButton {
    background-color: #e0e0e0;
    color: #2e2e2e;
  }

  .declineButton:hover {
    background-color: #f2f2f2;
  }
`;

export default CookieConsent;
