import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function LoginScreen() {
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
                                            <Form.Control type="email" placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" />
                                        </Form.Group>
                                        <div className="d-grid my-5">
                                            <Button variant="warning" type="submit">Continue</Button>
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