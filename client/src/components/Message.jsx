import React, { useState, useEffect } from 'react';

function Message({ children, type, message }) {
  // use useState hook to create a visible state
  const [visible, setVisible] = useState(true);

  // use useEffect hook to hide the message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // use a function to handle the click event
  const handleClick = () => {
    setVisible(false);
  };

  // if the message is not visible, return null
  if (!visible) {
    return null;
  }

  // otherwise, return the message element with the text and type props
  return (
    <div className={`message ${type}`} onClick={handleClick}>
      <p>{message}</p>
      {children}
    </div>
  );
}

export default Message;
 