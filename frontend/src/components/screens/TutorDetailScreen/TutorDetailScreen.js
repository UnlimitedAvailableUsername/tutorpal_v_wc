import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Container, Table } from "react-bootstrap";
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
				<Link to="/tutor-list" className="btn btn-warning btn-outline-dark py-3 my-5" >Back to Tutor List</Link>
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
                      <td>
                        {user.contact || "No number provided"}
                      </td>
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
                  <Button className="btn-warning btn-outline-dark" disabled={user.countInStock === 0} >
                    <strong>Enroll Now</strong>
                  </Button>
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
		</div>
	);
}

export default TutorDetailScreen;
