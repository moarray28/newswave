import React, { createContext, useContext,useEffect, useState } from 'react';

// Create a context
const UserContext = createContext(null);

// Context provider component
export const UserProvider = ({ children }) => {
  //const [user, setUser] = useState({}); 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  // Update local storage whenever the user state changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]); 
   
 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context
export const useUser = () => useContext(UserContext);
