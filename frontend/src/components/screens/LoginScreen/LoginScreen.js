import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function LoginScreen() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = e => {
        setEmail(e.target.value);
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email,password)
    }
    
    return (
        <div className="mt-100">
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={4} lg={10} xs={8}>
                    <Card className="bg-dark text-light px-4 my-5">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-5 text-uppercase ">Log In</h2>
                                <div className="mb-3">
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">Email address</Form.Label>
                                            <Form.Control value={ email } onChange={ handleEmail } type="email" placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control value={ password } onChange={ handlePassword } type="password" placeholder="Enter Password" />
                                        </Form.Group>
                                        <div className="d-grid my-5">
<<<<<<< HEAD
                                            <Button variant="warning" disabled={ !email || !password } onChange={ handleSubmit } type="submit">Continue</Button>
=======
                                            <Button variant="primary" disabled={ !email || !password } onChange={ handleSubmit } type="submit">Continue</Button>
>>>>>>> cb898d90c948a886e9f838199993c6911f0f8d18
                                        </div>
                                    </Form>
                                    <div className="mt-3">
                                        <p className="mb-0  text-center">
                                            Don't have an account?{' '}
                                            <Link to='#register' className="text-primary fw-bold">
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