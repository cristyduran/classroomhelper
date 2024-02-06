// ClassroomForm.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AddAssignment from './AddAssignment';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClassroomForm = () => {
    const [classInfo, setClassInfo] = useState({
        className: '',
        gradeLevel: '',
        students: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        assignments: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassInfo((prevClassInfo) => ({
            ...prevClassInfo,
            [name]: value,
        }));
    };

    const handleStudentNameChange = (index, value) => {
        setClassInfo((prevClassInfo) => {
            const updatedStudents = [...prevClassInfo.students];
            updatedStudents[index] = value;
            return {
                ...prevClassInfo,
                students: updatedStudents,
            };
        });
    };

    const handleAddStudent = () => {
        setClassInfo((prevClassInfo) => ({
            ...prevClassInfo,
            students: [...prevClassInfo.students, ''],
        }));
    };

    const handleAddAssignment = (newAssignment) => {
        setClassInfo({
            ...classInfo,
            assignments: [...classInfo.assignments, newAssignment],
        });
    };

    const handleDeleteAssignment = (index) => {
        const updatedAssignments = [...classInfo.assignments];
        updatedAssignments.splice(index, 1);
        setClassInfo({ ...classInfo, assignments: updatedAssignments });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        console.log('Auth Token:', authToken);

        // Add your logic to handle the form submission
        try {
            // Assume classInfo is the state containing the form data
            const response = await axios.post(
                'http://localhost:3001/classes/createClass',
                classInfo,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );

            if (response.data.success) {
                console.log('Class created successfully');
                // Optionally, you can redirect the user or perform other actions
            } else {
                console.error('Failed to create class:', response.data.message);
                // Handle the case where class creation failed
            }
        } catch (error) {
            console.error('Error creating class:', error);
            // Handle other potential errors, such as network issues
        }

        console.log('Form submitted:', classInfo);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-md-center">
                    <Col sm="12" md="6">
                        <div className="border border-dark p-3">
                            <FormGroup>
                                <Label for="className">Class Name</Label>
                                <Input
                                    type="text"
                                    name="className"
                                    id="className"
                                    placeholder="Enter class name"
                                    value={classInfo.className}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="gradeLevel">Grade Level</Label>
                                <Input
                                    type="select"
                                    name="gradeLevel"
                                    id="gradeLevel"
                                    value={classInfo.gradeLevel}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Grade Level</option>
                                    <option value="k">Kindergarten</option>
                                    <option value="1">1st Grade</option>
                                    <option value="2">2nd Grade</option>
                                    <option value="3">3rd Grade</option>
                                    <option value="4">4th Grade</option>
                                    <option value="5">5th Grade</option>
                                    <option value="6">6th Grade</option>
                                    <option value="7">7th Grade</option>
                                    <option value="8">8th Grade</option>
                                    <option value="9">9th Grade</option>
                                    <option value="10">10 Grade</option>
                                    <option value="11">11th Grade</option>
                                    <option value="12">12th Grade</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Student Names</Label>
                                {classInfo.students.map((student, index) => (
                                    <div key={index} className="d-flex align-items-center mb-2">
                                        <Input
                                            type="text"
                                            placeholder={`Student ${index + 1}`}
                                            value={student}
                                            onChange={(e) => handleStudentNameChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                                <Button type="button" onClick={handleAddStudent}>
                                    Add More Students
                                </Button>
                            </FormGroup>
                        </div>
                    </Col>

                    <Col sm="12" md="6">
                        <Row>
                            <Col>
                                <FormGroup>
                                    <AddAssignment onAddAssignment={handleAddAssignment} />
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* Display added assignments */}
                        <Container className="mt-3 border border-dark p-3">
                            <Col>
                                <Row>
                                    <h5>Added Assignments</h5>
                                </Row>
                                <Row className='text-center'>
                                    <ul>
                                        {classInfo.assignments.map((assignment, index) => (
                                            <li key={index} className="d-flex align-items-center justify-content-between mb-2">
                                                <Col>
                                                    <span>{assignment.assignment}</span>
                                                </Col>
                                                <Col>
                                                    <FontAwesomeIcon icon={assignment.icon} />
                                                </Col>
                                                <Col>
                                                    <Button size="sm" color="danger" onClick={() => handleDeleteAssignment(index)}>
                                                        X
                                                    </Button>
                                                </Col>
                                            </li>
                                        ))}
                                    </ul>
                                </Row>

                            </Col>
                        </Container>
                    </Col>
                </Row>


                <Row className="justify-content-center">
                    <Col xs="auto" className="text-center">
                        <Button color="primary" type="submit" className="btn-md m-4">
                            Save
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container >
    );
};

export default ClassroomForm;
