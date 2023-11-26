import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import NewClassPage from './pages/NewClassPage';
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
        <Route path="/account/newclass" element={<NewClassPage />} />
      </Routes>
    </div>
  );
}

export default App;
