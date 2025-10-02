import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'reactstrap';
import StudentTable from '../components/StudentDataTable';
import axios from 'axios';

const ClassPage = () => {
    const { classId } = useParams();
    const [ classData, setClassData ] = useState(null);
    console.log("Class ID from URL:", classId);
    const authToken = localStorage.getItem('authToken');
    console.log('Retrieved authToken in classpage:', authToken);

    useEffect(() => {
        //Fetch the class data using classId
        const fetchClassData = async () => {
            try {
                const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
                
                console.log(headers);

                const response = await axios.get(`http://localhost:3001/classes/${classId}`, { headers });

                setClassData(response.data);
            } catch (error) {
                console.error("Error fetching class data:", error);
            }
        };

        fetchClassData();
    }, [classId]);

    return (
        <Container>
            <div className="text-center m-2">
                <Link to="/account">
                    <Button color="primary">
                        Back
                    </Button>
                </Link>
            </div>
            {
                classData ? (
                <div className="d-flex flex-column  align-items-center m-4">
                    <h1>{classData.class_name}</h1>
                    <h2>Grade {classData.grade_level}</h2>
                </div>
                ) : (
                    <p>Loading class information...</p>
                )}
            <StudentTable />
        </Container>
        
    );
};

export default ClassPage;