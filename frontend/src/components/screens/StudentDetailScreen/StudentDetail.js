import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Image, ListGroup, Table, Button, Card} from "react-bootstrap";
import axios from "axios";

import { getStudentOrderDetails } from "../../../features/redux/actions/tutorActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";


function StudentDetailPage() {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const [messageAlert, setMessageAlert] = useState("");

  const userLoginState = useSelector((state) => state.userState);
  const { userInfo } = userLoginState;

  const studentDetails = useSelector((state) => state.studentDetails);
  const { error, loading, order } = studentDetails;

  useEffect(() => {
    dispatch(getStudentOrderDetails(studentId));
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
      <h1>Student Details</h1>
      <ListGroup.Item>
                    <h2>Tutor</h2>
                    <Card>
                      <Row>
                        <Col md={8}>
                          <h4>
                            {order.user.first_name}{" "}
                            {order.user.last_name}
                          </h4>
                          <p>{order.user.email}</p>
                        </Col>
                      </Row>
                    </Card>
                  </ListGroup.Item>
    </div>
  );
}

export default StudentDetailPage;
