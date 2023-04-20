import React, { useEffect, useState } from "react";
import {Row,Col,Image,ListGroup,Button,Container,Table,Form,} from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTutorDetails,updateTutor,} from "../../../features/redux/actions/tutorActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import Rating from "../../elements/Rating";


function EditUser() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
  
    const userLoginState = useSelector((state) => state.userState);
    const { userInfo } = userLoginState;
  
    const tutorDetails = useSelector((state) => state.tutorDetails);
    const { error, loading, user } = tutorDetails;

    
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  
    useEffect(() => {
      dispatch(listTutorDetails(userId));
    }, [dispatch, userId]);
  
    useEffect(() => {
      setActive(user?.active);
    }, [user]);
  
    const handleActivateTutor = async (e) => {
      e.preventDefault();
  
      if (!userId) {
        return;
      }
  
      const tutorData = {
        active: true,
      };
  
      try {
        await dispatch(updateTutor(userId, tutorData));
        window.location.reload(); // Reload page after successful submission
      } catch (error) {
        console.log(error);
        // handle error
      }
    };
  
    const handleDeactivateTutor = async (e) => {
      e.preventDefault();
  
      if (!userId) {
        return;
      }
  
      const tutorData = {
        active: false,
      };
  
      try {
        await dispatch(updateTutor(userId, tutorData));
        window.location.reload();
      } catch (error) {
        console.log(error);
        // handle error
      }
      
    };
  
    const renderActiveForm = () => {
      if (user?.active) {
        return (
          <Form onSubmit={handleDeactivateTutor}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="deactivate"
                name="deactivate"
                className="form-check-input"
                label="Deactivate"
                checked={!active}
                onChange={(e) => setActive(!e.target.checked)}
              />
            </Form.Group>
  
            <Button type="submit" className="btn btn-warning">
              Deactivate
            </Button>
          </Form>
        );
      } else {
        return (
          <Form onSubmit={handleActivateTutor}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="activate"
                name="activate"
                className="form-check-input"
                label="Activate"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
            </Form.Group>
  
            <Button type="submit" className="btn btn-warning">
              Activate
            </Button>
          </Form>
        );
      }
    };
      
  return (
    <div>
      {user && (
        <Container>
          <Button
            as={Link}
            to="/tutors-admit"
            variant="warning"
            className="btn-outline-dark py-3 my-5"
          >
            Back To Admit List
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
                      <br />
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <Row>
                    <Col md={{ span: 2 }}> Subjects</Col>
                    {user.subjects.map((subject) => (
                      <li key={subject.id}>{subject.subject_title}</li>
                    ))}
                    <Col></Col>
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
                <ListGroup variant="flush">
        {renderActiveForm()}
      </ListGroup>
              </ListGroup>
            </Col>
          </Row>


    
        </Container>

      )}

      

      
    </div>
  )
}

export default EditUser