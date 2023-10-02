import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Login.css';

export const Login = () => {
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
        //implement login logic here (eg API request)
    };

    return (
        <Container fluid className='h-100'>
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
                        <p>New? <a href="/register">Register here.</a></p>
                    </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
