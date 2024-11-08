import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Col, Row } from 'reactstrap';
import ClassCard from '../components/ClassCard';
import axios from 'axios';

const AccountPage = () => {
    const [ClassData, setClassData] = useState([]);
    const authToken = localStorage.getItem('authToken');
    console.log('Retrieved authToken in accountpage:', authToken);
    
    useEffect(() => {
        console.log('useEffect hook executed');
        // Fetch class data from the backend
        const fetchData = async () => {
            try {
                const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
                
                console.log(headers);
                
                const response = await axios.get('http://localhost:3001/classes/myClasses', { headers });
                
                console.log('Response:', response.data); // Log the response data
                
                setClassData(response.data);
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        };

        fetchData();
    }, [authToken]);

    return (
        <Container>
            <div className="d-flex flex-column  align-items-center m-4">
                <h1>My Classes.</h1>
            </div>
            <div className="m-2">
                <Row>
                {ClassData.map((classItem) => (
                    <Col key={classItem.id} xs={12} sm={6} md={4} lg={3}>
                    <ClassCard classData={classItem} />
                    </Col>
                ))}
                </Row>
            </div>
            <div className="text-center">
                <Link to="newclass">
                    <Button
                        color="primary"
                    >
                        Add a Class
                    </Button>
                </Link>
            </div>
        </Container>
    )
};

export default AccountPage;