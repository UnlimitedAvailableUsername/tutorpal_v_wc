import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { loginUser } from '../../../features/redux/actions/authUserActions';
import { useSelector, useDispatch } from 'react-redux'; 
import MessageAlert from '../../elements/MessageAlert';
import LoadingIconBig from '../../elements/Loader/LoadingIconBig';

function LoginScreen() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = useSelector( state => state.userState )
    const error = userLogin ? userLogin.error : null;
    const loading = userLogin ? userLogin.loading : false;
    const userInfo = userLogin ? userLogin.userInfo : null;

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split('=')[1] : '/profile';
    const redirectadmin = location.search ? location.search.split('=')[1] : '/concern-list';

    const handleEmail = e => {
        setEmail(e.target.value);
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!error) {
            dispatch(loginUser(email, password));
            navigate(redirect);
        }
    }

    useEffect(() => {
        if (userInfo && !userInfo.staff) {
            navigate(redirect);
        } 
        else if (userInfo && userInfo.staff) {
            navigate (redirectadmin)
        } 
    
    }, [navigate, userInfo, redirect, redirectadmin]);

    
    return (
        <div>
            <Row className="justify-content-center align-items-center">
                <Col xl={8} xs={10}>
                    <Card className="px-4 my-5 shadow">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <div className='mb-5' >
                                    <h2 className="fw-bold text-uppercase ">Log In</h2>
                                    { error && <MessageAlert variant='danger'>{ error }</MessageAlert> }
                                    { loading && <LoadingIconBig/> }
                                </div>
                                <div className="mb-3">
                                    <Form onSubmit={ handleSubmit }>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">Email address</Form.Label>
                                            <Form.Control value={ email } onChange={ handleEmail } type="email" placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control value={ password } onChange={ handlePassword } type="password" placeholder="Enter Password" />
                                        </Form.Group>
                                        <div className="d-grid my-5" style={{width: 300, margin: 'auto'}}>
                                            <Button variant="warning" disabled={ !email || !password } onChange={ handleSubmit } type="submit">Continue</Button>
                                        </div>
                                    </Form>
                                    <div className="mt-3">
                                        <p className="mb-0  text-center">
                                            Don't have an account?{' '}
                                            <Link to='/register' className="text-primary fw-bold">
                                                Sign Up
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginScreen