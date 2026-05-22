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
    faFish,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import api from '../api/api';


const StudentDataTable = ({ classId }) => {
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [cellStatus, setCellStatus] = useState({});

    // NEW: stores summaries and loading states per student
    const [summaries, setSummaries] = useState({});
    const [loadingStudentId, setLoadingStudentId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/classes/${classId}/student-data`)

                setStudents(response.data.students);
                setAssignments(response.data.assignments);

                const statusMap = {};
                response.data.completions.forEach(row => {
                    const key = `${row.student_id}-${row.assignment_id}`;
                    statusMap[key] = row.completed === 1;
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
        } catch (error) {
            console.error('Failed to save completion', error);
        }
    };

    // NEW: calls the AI summary endpoint
    const generateSummary = async (student) => {
        setLoadingStudentId(student.student_id);

        // Build the assignments list for this student
        const studentAssignments = assignments.map(assignment => {
            const key = `${student.student_id}-${assignment.assignment_id}`;
            return {
                name: assignment.assignment_name,
                completed: cellStatus[key] === true
            };
        });

        try {
            const response = await api.post('/generate-summary', {
                studentName: student.student_name,
                assignments: studentAssignments
            });

            setSummaries(prev => ({
                ...prev,
                [student.student_id]: response.data.summary
            }));
        } catch (error) {
            console.error('Failed to generate summary', error);
            setSummaries(prev => ({
                ...prev,
                [student.student_id]: 'Could not generate summary. Please try again.'
            }));
        } finally {
            setLoadingStudentId(null);
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
        <Table bordered responsive className="mt-4 text-center" striped style={{ border: '#444' }}>
            <thead>
                <tr>
                    <th>Student</th>
                    {assignments.map(assignment => (
                        <th key={assignment.assignment_id}>{assignment.assignment_name}</th>
                    ))}
                    {/* NEW: summary column header */}
                    <th>AI Summary</th>
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

                        {/* NEW: summary cell with button and result */}
                        <td style={{ minWidth: '220px', textAlign: 'left' }}>
                            <button
                                onClick={() => generateSummary(student)}
                                disabled={loadingStudentId === student.student_id}
                                style={{
                                    fontSize: '12px',
                                    padding: '4px 10px',
                                    marginBottom: summaries[student.student_id] ? '6px' : '0'
                                }}
                            >
                                {loadingStudentId === student.student_id ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '4px' }} />
                                        Generating...
                                    </>
                                ) : (
                                    '✨ Generate Summary'
                                )}
                            </button>

                            {summaries[student.student_id] && (
                                <p style={{
                                    fontSize: '12px',
                                    margin: '0',
                                    color: '#444',
                                    fontStyle: 'italic',
                                    lineHeight: '1.4'
                                }}>
                                    {summaries[student.student_id]}
                                </p>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default StudentDataTable;