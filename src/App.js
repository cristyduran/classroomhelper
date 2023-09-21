import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Login';
import { Header } from './components/Header';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Login />
    </div>
  );
}

export default App;
