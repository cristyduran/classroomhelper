import React from "react";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';


const ClassCard = ({ classData }) => {
    console.log('classData:', classData);

    const handleEditClick = () => {

    }

    const handleViewClick = () => {

    };

    return (
            <Card className="mb-4">
                <CardBody>
                    <CardTitle>{classData.class_name}</CardTitle>
                    <p>Grade: {classData.grade_level}</p>
                    {/* Other class details */}
                    <div  className="">
                        <Button color="link" onClick={handleEditClick}>
                            Edit
                        </Button>
                        <Button color="primary" onClick={handleViewClick}>
                            View
                        </Button>
                    </div>
                </CardBody>
            </Card>
    );
};

export default ClassCard;