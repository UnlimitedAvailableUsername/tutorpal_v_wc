import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Button, Container, Table, Form, } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listTutorDetails,
  updateTutor,
} from "../../../features/redux/actions/tutorActions";

function AdminTutorDetail() {
  const { tutorId } = useParams();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const tutorDetails = useSelector((state) => state.tutorDetails);
  const { error, loading, user } = tutorDetails;

  useEffect(() => {
    dispatch(listTutorDetails(tutorId));
  }, [dispatch, tutorId]);

  useEffect(() => {
    setActive(user?.active);
  }, [user]);

  const handleActivateTutor = async (e) => {
    e.preventDefault();

    const tutorData = {
      active: "True",
    };
    await dispatch(updateTutor(tutorId, tutorData));
    await dispatch(listTutorDetails(tutorId));
    console.log(tutorData)
  };

  const handleDeactivateTutor = async (e) => {
    e.preventDefault();
    const tutorData = {
      active: "False",
    };
    await dispatch(updateTutor(tutorId, tutorData));
    await dispatch(listTutorDetails(tutorId));
    console.log(tutorData)
  };

  return (
    <div>
      {user && (
        <Container>
          <div className="d-flex justify-content-between">
            <Button as={Link} to="/tutors-admit" variant="warning" className="btn-outline-dark py-3 my-5" >
              Back To Admit List
            </Button>
          </div>

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
              </ListGroup>
            </Col>

            <Col xs={12} md={8}>
            
              <ListGroup className="mt-0">
                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <Row>
                    <Col md={2}> Bio</Col>
                    <Col>
                      <p>{user.bio}</p>
                      <br />
                      <br />
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <Row>
                    <Col md={2}> Subjects</Col>
                    <Col>
                      {user.subjects.length > 0 ? (
                        <>
                          {user.subjects.map((subject) => (
                            <ul key={subject.id}>{subject.subject_title}</ul>
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

                <ListGroup.Item className="mt-4" style={{ backgroundColor: "#404040" }}>
                  <h3 className="text-center">Identification Proof</h3>
                  <div className="d-flex flex-column align-items-center justify-content-center mb-4">
                    <Form className="my-3">
                      <Form.Group controlId="photo_education_background" className="row align-items-center">
                        <Form.Label className="col-sm-4">Education Background Photo</Form.Label>
                        <div className="col-sm-8 d-flex align-items-top">
                          <Form.Control type="text" value={user.photo_education_background} disabled />
                          <Button variant="info" href={user.photo_education_background} download className="h-100">Download</Button>
                        </div>
                      </Form.Group>
                    </Form>
                    <Form className="my-3">
                      <Form.Group controlId="photo_education_background" className="row align-items-center">
                        <Form.Label className="col-sm-4">Valid Photo ID</Form.Label>
                        <div className="col-sm-8 d-flex align-items-top">
                          <Form.Control type="text" value={user.photo_education_background} disabled />
                          <Button variant="info" href={user.photo_id} download className="h-100">Download</Button>
                        </div>
                      </Form.Group>
                    </Form>

                    
                  </div>
                </ListGroup.Item>
              </ListGroup>
              <Button type="submit" variant="warning" style={{width: 200, marginLeft: 650, color: 'black'}}   className="mt-5" onClick={active ? handleDeactivateTutor : handleActivateTutor} > {active ? "Deactivate" : "Activate"} </Button>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default AdminTutorDetail;
