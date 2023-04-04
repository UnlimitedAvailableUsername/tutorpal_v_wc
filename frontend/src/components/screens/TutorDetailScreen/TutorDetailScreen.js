import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Container, Form, Table, } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSchedules } from "../../../features/redux/actions/scheduleAction";
import { listTutorDetails } from "../../../features/redux/actions/tutorActions";

function TutorDetailScreen() {
  const { id } = useParams();

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

            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <h3>
                  {user.first_name} {user.last_name}
                </h3>
              </ListGroup.Item>

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

              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col>Reviews: </Col>

                  <Col>
                    <strong>{user.numReviews}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

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

          <Col md={{ span: 9 }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}> Bio</Col>
                  <Col>
                    {user.bio}
                    <br />
                    <br />
                  </Col>
                </Row>
              </ListGroup.Item>

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
}

export default TutorDetailScreen;
