import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck, faHeart,
    faStar,
    faMusic,
    faThumbsUp,
    faSnowflake,
    faSun,
    faFish
} from '@fortawesome/free-solid-svg-icons';
import api from '../api/api';


const StudentDataTable = ({ classId }) => {
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [cellStatus, setCellStatus] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await api.get(`/classes/${classId}/student-data`)

                console.log("Student + assignment data:", response.data);

                setStudents(response.data.students);
                setAssignments(response.data.assignments);

                const statusMap = {};
                response.data.completions.forEach(row => {
                    const key = `${row.student_id}-${row.assignment_id}`;
                    statusMap[key] = row.completed ===1;
                });
                
                setCellStatus(statusMap);

            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchData();
    }, [classId]);
    
    // Toggle cell icon
    const toggleCell = async (student_id, assignment_id) => {
        const key = `${student_id}-${assignment_id}`;
        const newValue = !cellStatus[key];

        setCellStatus(prev => ({
            ...prev,
            [key]: newValue
        }));

        try {
            await api.post(`/classes/${classId}/complete`, {
                student_id,
                assignment_id,
                completed: newValue
            });
        } catch(error) {
            console.error ('Failed to save completion', error);
        }
    };

    const iconMap = {
        check: faCheck,
        heart: faHeart,
        star: faStar,
        music: faMusic,
        thumbsUp: faThumbsUp,
        snowflake: faSnowflake,
        sun: faSun,
        fish: faFish
      };

    return (

        <Table bordered responsive className="mt-4 text-center" striped style={{ border: '#444' }}
        >
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
                                        <FontAwesomeIcon 
                                        icon={iconMap[assignment.assignment_icon] || faCheck} 
                                        color="green" />
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