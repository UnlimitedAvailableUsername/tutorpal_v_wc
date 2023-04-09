import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Button, Container, Table, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listTutorDetails, createTutorReview } from "../../../features/redux/actions/tutorActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import Rating from '../../elements/Rating'

import { TUTOR_CREATE_REVIEW_RESET } from '../../../features/redux/constants/tutorConstants'

import HeaderHomePage from '../../elements/HeaderHomePage'
import HeaderStudent from '../../elements/HeaderStudent'

function TutorDetailScreen() {
	const { tutorId } = useParams();
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const userLoginState = useSelector(state => state.userState);
	const { userInfo } = userLoginState

	const tutorDetails = useSelector(state => state.tutorDetails);
	const { error, loading, user } = tutorDetails;



	const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
	const tutorReviewCreate = useSelector(state => state.tutorReviewCreate)
    const {
        loading: loadingTutorReview,
        error: errorTutorReview,
        success: successTutorReview,
    } = tutorReviewCreate

    useEffect(() => {
        if (successTutorReview) {
            setRating(0)
            setComment('')
            dispatch({ type: TUTOR_CREATE_REVIEW_RESET })
        }

        dispatch(listTutorDetails(tutorId))

    }, [dispatch, successTutorReview])

	const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createTutorReview(
            tutorId, {
            rating,
            comment
        }
        ))
    }




	// useEffect(() => {
	// 	dispatch(listTutorDetails(tutorId));
	// }, [dispatch, tutorId]);

	if (loading) {
		return (
			<Container>
				<LoadingIconBig />
			</Container>
		);
	}

	if (error) {
		return (
			<Container>
				<MessageAlert variant="danger">{error}</MessageAlert>
			</Container>
		);
	}

	/* DISABLE THE ENROLL BUTTON IF SCHEDULE IS EMPTY */
	const isDisabled = !user?.schedules || user.schedules.length === 0;

	function handleSubmit() {
		if (userInfo) {
			navigate(`/tutor/${tutorId}/schedules`);
		} else {
			navigate(`/login?redirect=${location.pathname}`);
		}
	};

	return (
		<div>

{userInfo && (userInfo.student || userInfo.user?.student) && (
		<HeaderStudent/>
	  ) }
  
  {!userInfo && <HeaderHomePage />}
  
			{user&& (
			<Container>
				<Button
					as={Link}
					to="/tutor"
					variant="warning"
					className="btn-outline-dark py-3 my-5"
				>
					Fuck, Back to Tutor List
				</Button>
		
					<Row>
						<Col xs={12} md={4}>
							<div className="d-flex align-items-center justify-content-center mb-4">
								<Image src={user.profile_picture} alt={user.first_name} fluid />
							</div>
							<ListGroup variant="flush">
								<ListGroup.Item style={{ backgroundColor: "#404040" }}>
									<h3>
										{user.first_name} {user.last_name}
									</h3>
								</ListGroup.Item>

								<ListGroup.Item style={{ backgroundColor: "#404040" }}>
									<Table striped className="table-responsive">
										<tbody>
											<tr>
												<td>Mobile:</td>
												<td>{user.contact || "No number provided"}</td>
											</tr>
											<tr>
												<td>Email:</td>
												<td style={{ wordWrap: "break-word" }}>
													{user.email || "No Email"}
												</td>
											</tr>
										</tbody>
									</Table>
								</ListGroup.Item>

								<ListGroup.Item style={{ backgroundColor: "#404040" }}>
									<Row>
										<Col>Reviews: </Col>
										<Col>
											<strong>{user.numReviews}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item style={{ backgroundColor: "#404040" }}>
									<Row className="p-3">
										<Button
											variant="warning"
											className="btn-outline-dark"
											disabled={isDisabled}
											onClick={handleSubmit}
										>
											<strong>Enroll Now</strong>
										</Button>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Col>

						<Col xs={12} md={8}>
							<ListGroup variant="flush" >
								<ListGroup.Item style={{ backgroundColor: "#404040", }}>
									<Row>
										<Col md={{ span: 2 }}> Bio</Col>
										<Col >
											<p >{user.bio}</p>
											<br />
											<br />
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item style={{ backgroundColor: "#404040" }}>
									<Row>
										<Col md={{ span: 2 }}> Eduation</Col>
										<Col>
											{user.Eduction}
											<br />
											<br />
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item style={{ backgroundColor: "#404040" }}>
									<Row>
										<Col md={{ span: 2 }}> Policies</Col>
										<Col>
											{user.policies}
											<br />
											<br />
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item style={{ backgroundColor: "#404040" }}>
									{user.schedules && user.schedules.length > 0 ? (
										<div>
											<div>Schedule:</div>
											<div>
												{user.schedules.map((schedule, index) => (
													<React.Fragment key={schedule._id}>
														{index > 0 && ", "}
														{schedule.name}
													</React.Fragment>
												))}
											</div>
										</div>
									) : (
										<div>No schedules available at the moment</div>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					
                                {/* <Col md={6}>
                                    <h4>Reviews</h4>
                                    {user.reviews.length === 0 && <MessageAlert variant='info'>No Reviews</MessageAlert>}

                                    <ListGroup variant='flush'>
                                        {user.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Write a review</h4>

                                            {loadingTutorReview && <LoadingIconBig/>}
                                            {successTutorReview && <MessageAlert variant='success'>Review Submitted</MessageAlert>}
                                            {errorTutorReview && <MessageAlert variant='danger'>{errorTutorReview}</MessageAlert>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingTutorReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                    <MessageAlert variant='info'>Please <Link to='/login'>login</Link> to write a review</MessageAlert>
                                                )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col> */}
                            
					</Row>
			
			</Container>
			)}
		</div>
	);
}

export default TutorDetailScreen;
