import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Login from '../components/LoginForm';


const LoginPage = () => {

    return (
        <Container>
            <Login 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
            />
        </Container>
    );
};

export default LoginPage;