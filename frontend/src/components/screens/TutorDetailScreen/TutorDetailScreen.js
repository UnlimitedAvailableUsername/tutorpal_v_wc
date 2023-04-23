import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Button, Container, Table, } from "react-bootstrap";
import { Form, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listTutorDetails } from "../../../features/redux/actions/tutorActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import Rating from "../../elements/Rating";
import { listReviewsOfTutor } from "../../../features/redux/actions/reviewsActions";
import ReviewList from "./ReviewList";
import ReviewCreate from "./ReviewCreate";

function TutorDetailScreen() {
  const { subjectId, tutorId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [messageAlert, setMessageAlert] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);

  const handleToggleEdit = () => {
    setToggleEdit(prevState => !prevState);
  };

  const toLink = subjectId ? `/subjects/${subjectId}` : '/tutor';

  
  const userLoginState = useSelector((state) => state.userState);
  const { userInfo } = userLoginState;
  
  const tutorDetails = useSelector((state) => state.tutorDetails);
  const { error, loading, user } = tutorDetails;
  
  const reviewListState = useSelector((state) => state.reviewListState);
  const { error: reviewsError, loading: reviewsLoading, reviews } = reviewListState;
  
  const reviewState = useSelector((state) => state.reviewState);
  const { error: reviewError, success: reviewSuccess, loading: reviewLoading, review } = reviewState;
  
  useEffect(() => {
    if (reviewSuccess) {
      setToggleEdit(false);
      dispatch(listReviewsOfTutor(tutorId));
    }
  }, [reviewSuccess, dispatch, tutorId])

  useEffect(() => {
    dispatch(listTutorDetails(tutorId));
    dispatch(listReviewsOfTutor(tutorId));
  }, [dispatch, tutorId]);

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

  const isDisabled = (
    !user?.schedules || 
    user.schedules.length === 0 ||
    user.schedules.every((schedule) => schedule.count_in_stock === 0)
  );
  

  function handleEnroll() {
    if (userInfo && user && userInfo.id === user.id) {
      setMessageAlert("Trying to buy yourself huh, kinky.");
    } else if (userInfo.tutor) {
      setMessageAlert("You can't do your own kind. (╭☞ ͡ ͡° ͜ ʖ ͡ ͡°)╭☞");
    } else if (userInfo.staff) {
      setMessageAlert("Umm this person works for you, do that at home not here (͠≖ ͜ʖ͠≖)");
    } else if (userInfo) {
      navigate(`/tutor/${tutorId}/schedules`);
    } else {
      navigate(`/login?redirect=${location.pathname}`);
    }
  }

  return (
    <div>
      {user && (
        <Container>
          <Button
            as={Link}
            to={toLink}
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
                    {messageAlert && (
                      <MessageAlert variant="primary">
                        {messageAlert}
                      </MessageAlert>
                    )}
                    <Button
                      variant="warning"
                      className="btn-outline-dark"
                      disabled={isDisabled}
                      onClick={handleEnroll}
                    >
                      <strong>Enroll Now</strong>
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col xs={12} md={8}>
              <ListGroup>
                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <Row>
                    <Col md={2}> Bio</Col>
                    <Col>
                      {user.bio ? (
                        <>
                          <p>{user.bio}</p>
                        </>
                      ) : (
                        <>
                          <p className="pb-5 mb-5">This tutor hasn't set any bio.</p>
                        </>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <Row>
                    <Col md={2}>Subjects</Col>
                    <Col>
                      {user.subjects.length > 0 ? (
                        <>
                          {user.subjects.map((subject) => (
                            <li key={subject.id}>{subject.subject_title}</li>
                          ))}
                        </>
                      ) : (
                        <div> No selected subjects </div>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <Row>
                    <Col md={2}>Schedules:</Col>
                    {user.schedules && user.schedules.filter(schedule => schedule.count_in_stock > 0).length > 0 ? (
                      <Col>
                        <Table style={{ border: "1px solid #ccc" }} striped responsive className="table-m-2 ">
                          <thead>
                            <tr>
                              <th style={{ textAlign: "center" }}>Date</th>
                              <th style={{ textAlign: "center" }}>Hours Available</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.schedules.filter(schedule => schedule.count_in_stock > 0).map(schedule => (
                              <tr key={schedule.id}>
                                <td style={{ textAlign: "center" }}>{schedule.name}</td>
                                <td style={{ textAlign: "center" }}>{schedule.count_in_stock}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    ) : (
                      <Col>No schedules available at the moment</Col>
                    )}
                  </Row>
                </ListGroup.Item>


              </ListGroup>
              <ListGroup className="mt-4">
                <ListGroup.Item style={{ backgroundColor: "#404040" }}><h4>Reviews</h4></ListGroup.Item>
                <ReviewList
                  reviews={reviews}
                  reviewsError={reviewsError}
                  reviewsLoading={reviewsLoading}
                  />
                <ReviewCreate
                  review={review}
                  reviewError={reviewError}
                  reviewSuccess={reviewSuccess}
                  reviewLoading={reviewLoading}
                  user={user}
                  toggleEdit={toggleEdit}
                  setToggleEdit={setToggleEdit}
                  tutorId={tutorId}
                  handleToggleEdit={handleToggleEdit}
                />
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default TutorDetailScreen;
