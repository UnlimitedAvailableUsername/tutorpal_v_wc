import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { getStudentOrderDetails } from "../../features/redux/actions/tutorActions";

function Student({ student, tutorId }) {
    const dispatch = useDispatch();
    const orderCount = student.orders.filter((order) => order.tutorId === tutorId).length;
  
    const handleStudentClick = () => {
      dispatch(getStudentOrderDetails(student.id));
    };
  
    return (
      <Row>
        <Card style={{ backgroundColor: "#404040" }} className="my-1 p-3 rounded">
          <Row>
            <Col md={3} className="d-flex justify-content-center align-items-center">
              <Link to={`/my-students/details/${student.id}`} style={{ textDecoration: "none" }}>
                <Card.Img style={{ width: 150 }} src={`${student.profile_picture}`} />
              </Link>
            </Col>
            <Col md={9} className="d-flex flex-column justify-content-center">
              <Card.Body>
                <Link to={`${student.id}`} style={{ textDecoration: "none" }} onClick={handleStudentClick}>
                  <Row>
                    <Col md={6}>
                      <Card.Title className="text-center mb-0" style={{ marginTop: "30px", color: "white" }}>
                        <strong>
                          {student.first_name} {student.last_name}
                        </strong>
                      </Card.Title>
                    </Col>
                    <Col md={6}>
                      <Card.Title className="text-center mb-0" style={{ marginTop: "30px", color: "gold" }}>
                        <strong>
                          Orders: {orderCount}
                        </strong>
                      </Card.Title>
                    </Col>
                  </Row>
                </Link>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Row>
    );
  }
export default Student;
