import React from 'react';
import { Container } from 'reactstrap';
import LoginForm from '../components/LoginForm';


const LoginPage = () => {

    return (
        <Container>
                        <div className="d-flex flex-column align-items-center m-4">
                <h1>ClassNotes</h1>
                <p>Login to start storing class participation.</p>
            </div>
            <LoginForm />
        </Container>
    );
};

export default LoginPage;