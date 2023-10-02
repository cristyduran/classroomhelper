import React from 'react';
import { Login } from './components/auth/Login';
import Header from './components/Header';
import Brand from './components/Brand';
import MyRoutes from './components/Routes';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Brand />
      <Login />
      <MyRoutes />
    </div>
  );
}

export default App;
