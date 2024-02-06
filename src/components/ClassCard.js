import React from "react";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';


const ClassCard = ({ classData }) => {
    const handleEditClick = () => {

    }

    const handleViewClick = () => {

    };

    return (
            <Card className="mb-4">
                <CardBody>
                    <CardTitle>{classData.className}</CardTitle>
                    <p>Grade: {classData.grade}</p>
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