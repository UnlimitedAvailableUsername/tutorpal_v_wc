import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Container, Table, } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetailsAndOrderedSchedules } from "../../../features/redux/actions/studentsActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import backgroundImage from '../../../assets/components/screens/ScheduleScreen/secret.png'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StudentDetailScreen() {
  const { studentId } = useParams();
  const dispatch = useDispatch();

  const studentDetailsState = useSelector((state) => state.studentDetailsState);
  const { error, loading, student } = studentDetailsState;

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

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '220vh',
    backgroundAttachment: 'fixed',
  }; 

  return (
    <div style={{height: 900}}>
      {student && (
        <Container>
          <Button as={Link} to="/my-students" variant="warning" className="btn-outline py-3 my-5" >
            &lt; Students List
          </Button>

          <Row>
            <Col xs={12} md={4}>
              
              <ListGroup variant="flush">
              <div className="d-flex align-items-center justify-content-center ">
                <Image src={student.profile_picture} alt={student.first_name} fluid />
              </div>
                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <h3>
                    {student.first_name} {student.last_name}
                  </h3>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <h5>
                    Username: {student.username}
                  </h5>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <Table striped className="table-responsive">
                    <tbody>
                      <tr>
                        <td>Mobile:</td>
                        <td>{student.contact || "No number provided"}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td style={{ wordWrap: "break-word" }}>
                          {student.email || "No Email"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col xs={12} md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <h2 className="my-4">SCHEDULES BOOKED</h2>
                  <Table striped bordered hover>
                    <thead>
                      <tr style={{textAlign: 'center'}}>
                        <th>ID</th>
                        <th>SCHEDULED DAYS</th>
                        <th>PAID STATUS</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.orders.map((scheduleOrder) => (
                        <>
                          <tr style={{textAlign: 'center'}}>
                            <td>{scheduleOrder.id}</td>
                            <td>
                              {scheduleOrder.schedules.map((schedule) => (
                                <>
                                  {schedule.name}
                                </>
                              ))}
                            </td>
                            
                            <td>{scheduleOrder.total_amount}</td>
                            <td>
                            <Button type="button" as={Link}  to={`orders/${scheduleOrder.id}`}  title="Details" className="btn btn-warning me-2 px-3" style={{ backgroundColor: "#F3AA22" }} >
                      <FontAwesomeIcon icon={ faEllipsis } />
                      </Button>
                      </td>       
                          </tr>
                        </>
                      ))}
                    </tbody>

                  </Table>
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
