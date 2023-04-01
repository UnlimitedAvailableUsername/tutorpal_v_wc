import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listTutorDetails } from "../../../features/redux/actions/tutorActions";

function TutorDetailScreen() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const tutorDetails = useSelector((state) => state.tutorDetails);
  const { error, loading, user } = tutorDetails;
  useEffect(() => {
    dispatch(listTutorDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Container>
        <Row>
            <Link to="/tutor-list" className="btn btn-warning btn-outline-dark py-3 my-5" >Back to Tutor List</Link>
        <Row>
        </Row>
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
                  <Col>Cotact:</Col>
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
                <Row className="p-3">
                  <Button className="btn-warning btn-outline-dark" disabled={user.countInStock === 0} > <strong>Enroll Now</strong> </Button>
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
                <Row>
                  <Col md={{ span: 2 }}> Schedule</Col>
                  <Col>
                    {user.schedule} <br />
                    <br />
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      {/* )} */}
    </div>
  );
}

export default TutorDetailScreen;
