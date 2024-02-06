import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Col, Row } from 'reactstrap';
import ClassCard from '../components/ClassCard';

const AccountPage = () => {
    const [ClassData, setClassData] = useState([
        { id: 1, className: 'Math Class', grade: 9 },
        { id: 2, className: 'Science Class', grade: 10 },
        { id: 1, className: 'Math Class', grade: 9 },
        { id: 2, className: 'Science Class', grade: 10 },
        { id: 1, className: 'Math Class', grade: 9 },
        { id: 2, className: 'Science Class', grade: 10 },
    ]);

    useEffect(() => {

    }, []);

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