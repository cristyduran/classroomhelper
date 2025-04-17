import React from "react";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const ClassCard = ({ classData }) => {
    
    console.log('classData:', classData);

    const handleEditClick = () => {

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