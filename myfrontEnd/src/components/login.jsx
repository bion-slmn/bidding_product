import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useAuth } from '../service/authservice';

function Login() {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setusername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted username:', auth);
        console.log('Submitted username:', username);
        console.log('Submitted Password:', password);
        setIsLoading(true);

        try {
            await auth.loginAction({ username, password });
        } catch (error) {
            console.error('Error logging in', error);
        }
        finally {
            setIsLoading(false);
        }

    };

    return (
        <Form className="login-form" onSubmit={handleSubmit}>
            <h1>Let's Login ...</h1>
            <br />
            <Form.Group className="mb-3" controlId="formBasicusername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="username"
                    placeholder="Enter username"
                    name="username"
                    value={username}
                    onChange={handleInput}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInput}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>Login</Button>
        </Form>
    );
}

export default Login;
