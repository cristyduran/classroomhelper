import { Container } from 'reactstrap';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    return (
        <Container>
            <div className="d-flex flex-column align-items-center m-4">
                <h1>ClassNotes</h1>
                <p>Register and start keeping track of your classes today with ClassNotes.</p>
            </div>
            <RegisterForm />
        </Container>
    )
};

export default RegisterPage;