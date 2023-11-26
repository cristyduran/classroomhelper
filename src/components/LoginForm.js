import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuthentication from './Authentication';

const LoginForm = () => {
    const { handleLogin, setIsAuthenticated } = useAuthentication();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = formData;
        console.log('Form Data:', formData);

            axios.post('http://localhost:3001/login', { username, password })
            .then(res => {
              if (res.data.validation) {
                alert('Login Successful.');
                const authToken = res.data.authToken;
                localStorage.setItem('authToken', authToken);
                handleLogin(authToken);
                setIsAuthenticated(true);
                console.log('Received Auth Token:', authToken);
                navigate('/account');
              } else {
                alert('Login was unsuccessful. Check username and/or password.');
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
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
                                value={formData.username}
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
                                value={formData.password}
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