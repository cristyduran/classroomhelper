import React from "react";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

const ClassCard = ({ classData }) => {

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/class/${classData.class_id}/edit`);
    }


    return (
        <Card className="mb-4">
            <CardBody>
                <CardTitle>{classData.class_name}</CardTitle>
                <p>Grade: {classData.grade_level}</p>
                {/* Other class details */}
                <div className="">
                    <Button color="link" onClick={handleEditClick}>
                        Edit
                    </Button>
                    <Link to={`/class/${classData.class_id}`}>
                        <Button color="primary">
                            View
                        </Button>
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
};

export default ClassCard;