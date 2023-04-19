import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Button, Container, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listTutorDetails } from "../../../features/redux/actions/tutorActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import Rating from '../../elements/Rating'



function TutorDetailScreen() {
  const { tutorId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userLoginState = useSelector(state => state.userState);
  const { userInfo } = userLoginState

  const tutorDetails = useSelector(state => state.tutorDetails);
  const { error, loading, user } = tutorDetails;

  useEffect(() => {
  	dispatch(listTutorDetails(tutorId));
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

  /* DISABLE THE ENROLL BUTTON IF SCHEDULE IS EMPTY */
  const isDisabled = !user?.schedules || user.schedules.length === 0;

  function handleEnroll() {
    if (userInfo) {
      navigate(`/tutor/${tutorId}/schedules`);
    } else {
      navigate(`/login?redirect=${location.pathname}`);
    };
  };

  return (
    <div>
      {user && (
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
                    <Button variant="warning" className="btn-outline-dark" disabled={isDisabled} onClick={handleEnroll} >
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
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <Row>
                    <Col md={{ span: 2 }}> Subjects</Col>
                    <Col>
                      {user.subjects.map((subject) => (
                        <li key={subject.id}>{subject.subject_title}</li>
                      ))}
                    </Col>
                    <Col>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                    <Row>
                      <Col md={{ span: 2 }}>Schedule:</Col>
                      {user.schedules && user.schedules.length > 0 ? (
                        <Col>
                          {user.schedules.map((schedule, index) => (
                            <li key={schedule._id}>{schedule.name}</li>
                          ))}
                        </Col>
                      ) : (
                        <Col>No schedules available at the moment</Col>
                      )}
                    </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

        </Container>
      )}
    </div>
  );
}

export default TutorDetailScreen;
