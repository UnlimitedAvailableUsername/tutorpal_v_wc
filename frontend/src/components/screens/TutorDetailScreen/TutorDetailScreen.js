<<<<<<< HEAD
import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Container, Form, Table, } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSchedules } from "../../../features/redux/actions/scheduleAction";
import { listTutorDetails } from "../../../features/redux/actions/tutorActions";
=======
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
>>>>>>> master

function TutorDetailScreen() {
	const { tutorId } = useParams();
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

<<<<<<< HEAD
  const dispatch = useDispatch();
  const tutorDetails = useSelector((state) => state.tutorDetails);
  const { error, loading, user } = tutorDetails;
  
  useEffect(() => {
    dispatch(listTutorDetails(id));
  }, [dispatch, id]);

  const scheduleList = useSelector((state) => state.scheduleList);
  const schedules = scheduleList?.schedules || [];

  useEffect(() => {
    dispatch(listSchedules());
  }, []);

  return (
    <div>
      <Container>
        <Link
          to="/tutor-list"
          className="btn btn-warning btn-outline-dark py-3 my-5"
        >
          Back to Tutor List
        </Link>
        <Row>
          <Row></Row>
          <Col md={{ span: 3 }} style={{ position: "relative" }}>
            <Image src={user.profile_picture} alt={user.first_name} fluid />
=======
	const userLoginState = useSelector(state => state.userState);
	const { userInfo } = userLoginState

	const tutorDetails = useSelector(state => state.tutorDetails);
	const { error, loading, user } = tutorDetails;
>>>>>>> master


<<<<<<< HEAD
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col>Contact:</Col>
                  <Col>
                    <strong>
                      {user.contact} {user.email}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
=======
>>>>>>> master

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

<<<<<<< HEAD
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col>Rate Per Hour: </Col>

                  <strong> Php: {user.price_rate_hour}</strong>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row className="p-3">
                  <Button
                    className="btn-warning btn-outline-dark"
                    disabled={user.countInStock === 0}
                  >
                    {" "}
                    <strong>Enroll Now</strong>{" "}
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
=======
        dispatch(listTutorDetails(tutorId))
>>>>>>> master

    }, [dispatch, successTutorReview])

<<<<<<< HEAD
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}> Available Schedule</Col>
                  <Col>

                  <Table striped responsive className="table-m-2">
            <thead>
              <tr>
                <th>Day</th>
                <th>Number of Hours Available</th>

              </tr>
            </thead>

            <tbody>
              {schedules.map((item) => (
                <tr key={item.date}>
                  <td>{item.date}</td>
                  <td>{item.count_in_stock_hour}</td>
                </tr>
              ))}
          </tbody>
          </Table>
                    <br />
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}> Pick Schedule</Col>
                  <Col>

                  <Form>
                    <Form.Group className="mb-3">
                       <Form.Label></Form.Label>
                      {" "}
                      <Form.Control
                        as="select"
                        id="subject"
                        name="subject"
                        className="form-control"
                        placeholder="Please Select"
                        // value={subject}
                        // onChange={(e) => setSubject(e.target.value)}
                      >
                        <option value="">--Pick Schedule--</option>
                        {schedules.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.date}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    </Form>
                    <br />
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
=======
	const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createTutorReview(
            tutorId, {
            rating,
            comment
        }
        ))
    }

	const subjectNamesById = {
		1: "Mathematics",
		2: "Science",
		3: "English",
		4: "History",
	};



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
										<Col md={{ span: 2 }}> Subjects</Col>
										<Col>
										{user.subjects.map((subjectId, index) => (
										<span key={subjectId}>
											{subjectNamesById[subjectId]}
											{index < user.subjects.length - 1 ? ", " : ""}
										</span>
									))}
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
														{schedule.price}

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
>>>>>>> master
}

export default TutorDetailScreen;
