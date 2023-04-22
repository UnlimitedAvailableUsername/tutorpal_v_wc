import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/redux/actions/authUserActions";
import { listSubjects } from "../../../features/redux/actions/subjectActions";
import { USER_REGISTER_UNIQUE_VALIDATE_RESET } from "../../../features/redux/constants/authUserConstants";
import { useNavigate } from "react-router";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import MessageAlert from "../../elements/MessageAlert";
import { Link } from "react-router-dom";
import LoadingIconRegular from "../../elements/Loader/LoadingIconRegular";


const RegisterForTutorScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const userRegisterState = useSelector((state) => state.userRegisterState);
	const { loading: registerLoading, error: registerError, success, valid, registerFormData, } = userRegisterState;

	const subjectList = useSelector((state) => state.subjectList);
	const { subjects, loading: subjectLoading, error: subjectError, } = subjectList;

	useEffect(() => {
		if (valid && registerFormData) {
			dispatch({ type: USER_REGISTER_UNIQUE_VALIDATE_RESET })
		} else if (success) {
      navigate('/register/result')
    } else if (!registerFormData) {
			navigate('/register')
		}
	}, [valid, success, registerFormData, dispatch, navigate])

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		contact: '',
		profile_picture: null,
		bio: '',
		photo_education_background: null,
		photo_id: null,
		price_rate_hour: 0,
		subjects: {},
		...registerFormData,
	});
	
	const handleInputChange = (e) => {
		const { name, value, files } = e.target;
	
		if (name === 'contact') {
			// Allow only numbers and the "+" symbol
			const regex = /^[0-9+]+$/;
			if (value === '' || regex.test(value)) {
				setFormData((prevState) => ({
					...prevState,
					[name]: value,
				}));
			}
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: files ? files[0] : value,
			}));
		}
	};
	
	const handleSubjectSelection = (e) => {
		const { name, checked } = e.target;
		const subjectId = parseInt(name, 10);
		const updatedSubjects = { ...formData.subjects };
	
		if (checked) {
			updatedSubjects[subjectId] = true;
		} else {
			delete updatedSubjects[subjectId];
		}
	
		setFormData((prevState) => ({
			...prevState,
			subjects: updatedSubjects,
		}));
	};
	
	const handleRegister = (e) => {
		e.preventDefault();
	
		const updatedFormData = new FormData();
	
		// Append the data from the `formData` state instance
		Object.keys(formData).forEach((key) => {
			if (key === 'subjects') {
				// Append the selected subjects individually
				Object.keys(formData[key]).forEach((subjectId) => {
					updatedFormData.append('subjects', subjectId);
				});
			} else if (
				formData[key] !== null &&
				key !== 'profile_picture' &&
				key !== 'photo_id' &&
				key !== 'photo_education_background'
			) {
				updatedFormData.append(key, formData[key]);
			} else if (formData[key] !== null) {
				updatedFormData.append(key, formData[key]);
			}
		});
		console.log(updatedFormData)
		// Dispatch the `registerUser` action with the `updatedFormData`
		dispatch(registerUser(updatedFormData));
	};

	useEffect(() => {
		dispatch(listSubjects());
	}, [dispatch]);

	return (
		<div>
			{ registerFormData && (
				<Row className="justify-content-center align-items-center">
					<Col xl={8} xs={10}>
						<Button as={Link} to="/register" variant="warning" className="btn-outline-dark py-2 mt-5" >&lt; Go back</Button>
						<Card className="px-0 my-5 shadow">
							<Card.Title className="mx-4 my-4">
								<h2 className="text-center"><strong>Tutor Registration</strong></h2>
							</Card.Title>
							<Card.Body>
								<Form onSubmit={handleRegister}>
									<Row>
										<Col md={6}>
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
										</Col>
										<Col md={6}>
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

											<Form.Group>
												<Form.Label htmlFor="photo_education_background">Proof of Photo for Background Education:</Form.Label>
												<Form.Control
													type="file"
													id="photo_education_background"
													name="photo_education_background"
													accept="image/*"
													onChange={handleInputChange}
													value={registerFormData.photo_education_background}
												/>
											</Form.Group>

											<Form.Group>
												<Form.Label htmlFor="photo_id">Valid ID</Form.Label>
												<Form.Control
													type="file"
													id="photo_id"
													name="photo_id"
													accept="image/*"
													onChange={handleInputChange}
													value={registerFormData.photo_id}
												/>
											</Form.Group>

											<Form.Group>
												<Form.Label htmlFor="price_rate_hour">What is your hourly price rate?</Form.Label>
												<Form.Control
													type="number"
													step="0.01"
													id="price_rate_hour"
													name="price_rate_hour"
													value={formData.price_rate_hour}
													onChange={handleInputChange}
												/>
											</Form.Group>
										</Col>
									</Row>

									<Form.Group>
										<Form.Label><h4>Select the Subjects you want to associate yourself with:</h4></Form.Label>
										{subjectLoading ? (
											<div className="text-center">
												<h5>Listing available subject list...</h5>
												<LoadingIconRegular />
											</div>
										) : subjectError ? (
											<>
												<MessageAlert variant="danger">{subjectError}</MessageAlert>
											</>
										) : (
											subjects && subjects.length > 0 ? (
												subjects.map((subject) => (
													<div key={subject.id}>
														<Form.Check
															type="checkbox"
															id={`subject-${subject.id}`}
															name={subject.id}
															label={subject.subject_title}
															onChange={handleSubjectSelection}
														/>
													</div>
												))
											) : (
												<MessageAlert variant="info">No available subjects at the moment, you may still select after account creation</MessageAlert>
											)
										)}
									</Form.Group>
									<Button className="mt-4" variant="warning" type="submit">
										{registerLoading ? (
											<span>
												<Spinner animation="border" size="sm"/>
												Registering...
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
		</div>
	);
};

export default RegisterForTutorScreen;
