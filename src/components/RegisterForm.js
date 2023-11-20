import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';



const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [isUsernameTaken, setIsUsernameTaken] = useState(false);

    useEffect(() => {
        setIsUsernameTaken(false);
    }, [formData.username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const checkUsernameAvailability = async () => {
        try {
            const response = await axios.post('http://localhost:3001/checkUsername', {
                username: formData.username,
            });

            setIsUsernameTaken(!response.data.available);
        } catch (error) {
            console.error('Error checking username availability:', error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // check username availability before submitting the registration
        checkUsernameAvailability();

        //handle password mismatch
        if (formData.password !== formData.confirmPassword) {
            console.log("Passwords do not match");
            return;
        }
        // Implement registration logic (API request)
        // Make a POST request to /register endpoint
        axios.post('http://localhost:3001/register', {
            name: formData.name,
            username: formData.username,
            password: formData.password,
        })
            .then(res => {
                console.log('Registration response:', res.data);
                if (res.data.success) {
                    alert('Registration successful.');
                    // redirect to the login page
                    window.location.href='/login';
                } else {
                    alert('Registration failed.' + res.data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        console.log(formData); // Print form data to the console for testing
        // add API call here
    };

    return (
        <Container fluid className="h-100">
            <Row className="h-100 justify-content-center align-items-center">
                <Col md="6">
                    <div className="register-container">
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    onBlur={checkUsernameAvailability}
                                    required
                                />
                                {isUsernameTaken && <p className='error-message'>Username is already taken.</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterForm;
