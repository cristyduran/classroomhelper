// Authentication.js
import { useState, useEffect } from 'react';

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('authToken');
    setIsAuthenticated(!!storedAuth);
    console.log('store auth:', storedAuth);
  }, []);

  const handleLogin = (authToken) => {
    localStorage.setItem('authToken', authToken, () => {
      setIsAuthenticated(true);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    handleLogin,
    handleLogout,
    setIsAuthenticated
  };
};

export default useAuthentication;
