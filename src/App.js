import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './components/LoginForm';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
