// AddCategory.js
import React, { useState } from 'react';
import { Button, Input, Label, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCoffee, faCode, faBook, faMusic } from '@fortawesome/free-solid-svg-icons';


const iconOptions = [
    { label: 'Coffee', value: faCoffee },
    { label: 'Code', value: faCode },
    { label: 'Book', value: faBook },
    { label: 'Music', value: faMusic },
];

const AddCategory = ({ onAddCategory }) => {
    const [category, setCategory] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].value);

    const handleAddCategory = () => {
        // Check if category is not empty before adding
        if (category.trim() !== '') {
            onAddCategory({ category, icon: selectedIcon });
            // Clear input fields after adding
            setCategory('');
            setSelectedIcon(iconOptions[0].value);
        }
    };

    return (
        <div className="border border-dark p-3">
            <h5>Add Category</h5>
                <Row>
                    <Col>
                        <div className="flex-grow-1 mr-2">
                            <Label for="category">Category</Label>
                            <Input
                                type="text"
                                id="category"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="flex-grow-1">
                            <Label for="icon">Icon</Label>
                            <Input
                                type="select"
                                id="icon"
                                value={selectedIcon}
                                onChange={(e) => setSelectedIcon(e.target.value)}
                            >
                                {iconOptions.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Input>
                        </div>
                    </Col>
                </Row>

            <Button className="mt-2" color="primary" onClick={handleAddCategory}>
                Add
            </Button>
        </div>
        
    );
};

export default AddCategory;
