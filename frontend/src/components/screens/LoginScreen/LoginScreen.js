import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { loginUser } from '../../../features/redux/actions/authUserActions';
import { useSelector, useDispatch } from 'react-redux'; 
import MessageAlert from '../../elements/MessageAlert';
import LoadingIconBig from '../../elements/LoadingIcon';

 
function LoginScreen() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = useSelector( state => state.userState )
    const { error, loading, userInfo } = userLogin

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split('=')[1] : '/profile'


    const handleEmail = e => {
        setEmail(e.target.value);
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch( loginUser( email, password) )
    }


    useEffect( () => { if(userInfo){ navigate(redirect) } }, [ navigate, userInfo, redirect ] )
 
    
    return (
        <div>
            <Row className="justify-content-center align-items-center">
                <Col xl={8} xs={10}>
                    <Card className="px-4 my-5">
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
                                        <div className="d-grid my-5">
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