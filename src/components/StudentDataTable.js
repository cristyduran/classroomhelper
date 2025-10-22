import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import api from '../api/api';


const StudentDataTable = ({ classId }) => {
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [cellStatus, setCellStatus] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {

               /* const authToken = localStorage.getItem('authToken');
                console.log('Retrieved authToken in studentDataTable:', authToken);*/

                const response = await api.get(`/classes/${classId}/student-data`)

                console.log("Student + assignment data:", response.data);

                setStudents(response.data.students);
                setAssignments(response.data.assignments);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchData();
    }, [classId]);

    // Toggle cell icon
    const toggleCell = (student_id, assignment_id) => {
        const key = `${student_id}-${assignment_id}`;
        setCellStatus(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (

        <Table bordered responsive className="mt-4 text-center">
            <thead>
                <tr>
                    <th>Student</th>
                    {assignments.map(assignment => (
                        <th key={assignment.assignment_id}>{assignment.assignment_name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.student_id}>
                        <td><strong>{student.student_name}</strong></td>
                        {assignments.map(assignment => {
                            const key = `${student.student_id}-${assignment.assignment_id}`;
                            return (
                                <td 
                                    key={assignment.assignment_id}
                                    className="text-center"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => toggleCell(student.student_id, assignment.assignment_id)}
                                >
                                    {cellStatus[key] && (
                                        <FontAwesomeIcon icon={faCheck} color="green" />
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </Table>

    );
};

export default StudentDataTable;