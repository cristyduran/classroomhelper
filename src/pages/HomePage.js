import { Container } from 'reactstrap';
import Login from '../components/LoginForm';

const HomePage = () => {
    return (
        <Container>
            <div className="d-flex flex-column align-items-center m-4">
                <h1>ClassNotes</h1>
                <p>A place for classroom music educators to save every day classroom data. Stay organized with ClassNotes.</p>
            </div>
            <Login />
        </Container>
    )
};

export default HomePage;