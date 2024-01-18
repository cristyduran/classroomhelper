import React, { useState, useEffect } from 'react';
import { useAuthentication } from './AuthenticationContext';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const { handleLogin, isAuthenticated } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to account page if user is already authenticated
        if (isAuthenticated) {
            navigate('/account');
        }
    }, [isAuthenticated, navigate]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });

            if (response.data && response.data.validation !== undefined) {
                if (response.data.validation) {
                    alert('Login Successful.');
                    const authToken = response.data.authToken;
                    localStorage.setItem('authToken', authToken);
                    handleLogin(authToken);
                    console.log('Received Auth Token:', authToken);
                    navigate('/account');
                } else {
                    alert('Login was unsuccessful. Check username and/or password.');
                }
            } else {
                console.error('Invalid response format:', response.data);
                alert('An unexpected error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };


    return (
        <Container current='LoginPage' fluid className='h-100'>
            <Row className="h-100">
                <Col
                    md="6"
                    className="mx-auto my-auto"
                >
                    <div className='login-container'>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder='Enter your username here'
                                    value={username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder='Enter your password here'
                                    value={password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit">Log In</button>
                            <p>New? <Link to="/register">Register here.</Link></p>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;