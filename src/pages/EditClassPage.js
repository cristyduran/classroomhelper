import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../api/api';
import ClassroomForm from '../components/ClassroomForm';
import { Container } from "reactstrap";


const EditClassPage = () => {
    const [ClassData, setClassData] = useState([]);
    const { classId } = useParams();

    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        // Fetch class data from the backend
        const fetchData = async () => {
            try {
                const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

                const classResponse = await api.get(`/classes/${classId}`, { headers });
                const rosterResponse = await api.get(`/classes/${classId}/student-data`, { headers });

                console.log(rosterResponse.data.assignments)
                 console.log(classResponse.data)
                setClassData({
                    class_id: classResponse.data.class_id,
                    className: classResponse.data.class_name,
                    gradeLevel: classResponse.data.grade_level,
                    students: rosterResponse.data.students.map(student => student.student_name),
                    assignments: rosterResponse.data.assignments.map(a => ({
                        assignment: a.assignment_name,
                        icon: a.assignment_icon
                    }))
                });

            } catch (error) {
                console.error('Error fetching class data:', error);
            }

        };

        fetchData();
    }, [authToken]);

    return (
        <Container>
            <div className="d-flex flex-column align-items-center m-4">
                <h1>Edit Class</h1>
            </div>
            {ClassData.className ? (
                <ClassroomForm initialData={ClassData} isEditMode={true} />
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    )
}

export default EditClassPage;