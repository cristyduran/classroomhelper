import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './auth/Register';
import About from './About';

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default MyRoutes;