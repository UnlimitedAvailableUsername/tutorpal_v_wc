import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { USER_REGISTER_UNIQUE_VALIDATE_RESET } from "../../../features/redux/constants/authUserConstants";
import { Link } from 'react-router-dom';
import MessageAlert from '../../elements/MessageAlert';
import { registerUser } from '../../../features/redux/actions/authUserActions';


const RegisterForStudentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegisterState = useSelector((state) => state.userRegisterState);
	const { loading: registerLoading, error: registerError, success, valid, registerFormData, } = userRegisterState;

  useEffect(() => {
		if (valid && registerFormData) {
			dispatch({ type: USER_REGISTER_UNIQUE_VALIDATE_RESET })
		} else if (!registerFormData) {
			navigate('/register')
		} else if (success) {
      navigate('/register/result')
    }
	}, [valid, success, registerFormData, dispatch, navigate])

  const [formData, setFormData] = useState({
		...registerFormData,
		first_name: "",
		last_name: "",
		contact: "",
		profile_picture: null,
	});

	const handleInputChange = (e) => {
		const { name, value, files } = e.target;

		setFormData((prevState) => ({
			...prevState,
			[name]: files ? files[0] : value,
		}));
	};

  const handleRegister = (e) => {
		e.preventDefault();
		dispatch(registerUser(formData));
		console.log(formData);
	};

  return (
    <>
      { registerFormData && (
        <Row className="justify-content-center align-items-center">
          <Col xl={8} xs={10}>
            <Button as={Link} to="/register" variant="warning" className="btn-outline-dark py-2 mt-5" >&lt; Go back</Button>
            <Card className="px-0 my-5 shadow">
							<Card.Title className="mx-4 my-4">
								<h2 className="text-center"><strong>Student Registration</strong></h2>
							</Card.Title>
							<Card.Body>
								<Form onSubmit={handleRegister}>
									<Row>
                    <Form.Group controlId="first_name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" name="first_name" onChange={handleInputChange} value={formData.first_name} />
                    </Form.Group>

                    <Form.Group controlId="last_name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name="last_name" onChange={handleInputChange} value={formData.last_name} />
                    </Form.Group>

                    <Form.Group controlId="contact">
                      <Form.Label>Contact</Form.Label>
                      <Form.Control type="text" name="contact" onChange={handleInputChange} value={formData.contact} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor="profile_picture">Profile Picture</Form.Label>
                      <Form.Control
                        type="file"
                        id="profile_picture"
                        name="profile_picture"
                        accept="image/*"
                        onChange={handleInputChange}
                        value={registerFormData.profile_picture}
                      />
                    </Form.Group>
									</Row>
									<Button className="mt-4" variant="warning" type="submit">
										{registerLoading ? (
											<span>
												<Spinner animation="border" size="sm"/>
												&nbsp;&nbsp;Registering...
											</span>
										) : (
											"Register"
										)}
									</Button>
									{registerError && !registerLoading && (
										<MessageAlert variant="danger">{registerError}</MessageAlert>
									)}
								</Form>
							</Card.Body>
						</Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default RegisterForStudentScreen;