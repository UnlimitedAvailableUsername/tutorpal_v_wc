import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Button, Container, Table, } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetailsAndOrderedSchedules } from "../../../features/redux/actions/studentsActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";

function StudentDetailScreen() {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentDetailsState = useSelector((state) => state.studentDetailsState);
  const { error, loading, user } = studentDetailsState;

  useEffect(() => {
    dispatch(getStudentDetailsAndOrderedSchedules(studentId));
  }, [dispatch, studentId]);

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
                      <MessageAlert variant="warning"></MessageAlert>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col xs={12} md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <Row>
                    <Col md={{ span: 2 }}> Bio</Col>
                    <Col>
                      <p>{user.bio}</p>
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
                    <Col></Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <Row>
                    <Col md={{ span: 2 }}>Schedule:</Col>
                    {user.schedules && user.schedules.length > 0 ? (
                      <Col>
                        <Table
                          style={{ border: "1px solid #ccc" }}
                          striped
                          responsive
                          className="table-m-2 "
                        >
                          <thead>
                            <tr>
                              <th style={{ textAlign: "center" }}>Date</th>
                              <th style={{ textAlign: "center" }}>
                                Hours Available
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.schedules &&
                              user.schedules.map((schedule) => (
                                <tr key={schedule.id}>
                                  <td style={{ textAlign: "center" }}>
                                    {schedule.name}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {schedule.count_in_stock}
                                  </td>
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
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default StudentDetailScreen;
