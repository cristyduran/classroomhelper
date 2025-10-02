import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const StudentTable = () => {
    return (
        <Container>
            <Row xs="4" >
                <Col className="bg-light border">
                    student name
                </Col>
                <Col className="bg-light border">
                    assignment
                </Col>
                <Col className="bg-light border">
                    assignment
                </Col>
                <Col className="bg-light border">
                    assignment
                </Col>
            </Row>
        </Container>
    );
};

export default StudentTable;