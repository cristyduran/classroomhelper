// Authentication.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('authToken');
    setIsAuthenticated(!!storedAuth);
    console.log('store auth:', storedAuth);
  }, []);

  const handleLogin = (authToken) => {
  // Update local storage first
  localStorage.setItem('authToken', authToken);

  // Update state immediately
  setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const contextValue = {
    isAuthenticated,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  )
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};


export default AuthenticationContext;