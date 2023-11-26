import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'reactstrap';

const AccountPage = () => {
    return (
        <Container>
            <div className="d-flex flex-column align-items-center m-4">
                <h1>My Classes.</h1>
            </div>
            <div class="text-center">
                <Link to="newclass">
                <Button
                    color="primary"
                >
                    Add a Class
                </Button>
                </Link>
            </div>
        </Container>
    )
};

export default AccountPage;