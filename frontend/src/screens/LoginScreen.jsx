import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/loginSlice'
import { toast } from 'react-toastify'



const LoginScreen = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    // Get user info
    const { userInfo } = useSelector((state) => state.login);

    // Confirm if there is a redirect
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        // Check if one is logged in 
        if (userInfo) {
            // Navigate to the redirected page
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res, }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                {/* Email */}
                <Form.Group controlId='email' className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                {/* Password */}
                <Form.Group controlId='password' className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                {/* Button */}
                <Button type='submit' variant='primary' className="mt-2" disabled={isLoading}>
                    Sign In
                </Button>
                {/* Check for loading */}
                {isLoading && <Loader />}
            </Form>
            {/* Link to Register */}
            <Row className="py-3">
                <Col>
                    New Here?   <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen