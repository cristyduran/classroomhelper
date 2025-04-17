import React from 'react';
import { AuthenticationContextProvider } from './components/AuthenticationContext';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import NewClassPage from './pages/NewClassPage';
import ClassPage from './pages/ClassPage';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <AuthenticationContextProvider>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/class/:classId' element={<ClassPage />}></Route>
          <Route path='account' element={<AccountPage/>} />
          <Route path='account/newclass' element={<NewClassPage/>} />
        </Route>
        </Routes>
      </div>
    </AuthenticationContextProvider>
  );
}

export default App;
