import React from 'react';
import { Container } from 'reactstrap';
import ClassroomForm from '../components/ClassroomForm';

const NewClassPage = () => {
    return (
        <Container>
            <div className="d-flex flex-column align-items-center m-4">
                <h1>Add a new class.</h1>
            </div>
        <ClassroomForm />
        </Container>
    )
};

export default NewClassPage;