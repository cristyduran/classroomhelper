import React from 'react';
import { Container } from 'reactstrap';
import LoginForm from '../components/LoginForm';
import ClassNotesLogo from '../assets/ClassNotesLogo.png'


const LoginPage = () => {

    return (
        <Container>
            <div className="d-flex flex-column align-items-center m-4">
                <h1>ClassNotes</h1>
                <img src={ClassNotesLogo} alt="ClassNotes logo" style={{
                    width: '200px',
                    marginBottom: '16px',
                    borderRadius: '22px',
                    mixBlendMode: 'multiply'
                }} />
                <p>Login to start storing class participation.</p>
            </div>
            <LoginForm />
        </Container>
    );
};

export default LoginPage;