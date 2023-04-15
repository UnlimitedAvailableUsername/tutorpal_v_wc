import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderTutor from "../../elements/HeaderTutor";
import {
  listScheduleDetails,
  updateSchedule,
} from "../../../features/redux/actions/scheduleAction";

function EditSchedule() { 
  const { scheduleId } = useParams();

  const dispatch = useDispatch();
  const scheduleDetails = useSelector((state) => state.scheduleDetails);
  const { schedule } = scheduleDetails || {};
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [count_in_stock, setCount_in_stock] = useState("");

  useEffect(() => {
    dispatch(listScheduleDetails(scheduleId));
  }, [dispatch, scheduleId]);

  const handleEditSchedule = async (e) => {
    e.preventDefault();

    if (!scheduleId) {
      return;
    }

    const scheduleData = {
      name,
      count_in_stock,
    };
    

    try {
      await dispatch(updateSchedule(scheduleId, scheduleData));
      navigate("/myschedule");
    } catch (error) {
      console.log(error);
      // handle error
    }
  };


  return (
    <>
      <div>
        <Container>
          <Link
            to="/myschedule"
            className="btn btn-warning btn-outline-dark py-3 my-5"
          >
            My schedules
          </Link>
          <Row>
            <Col md={{ span: 3 }} style={{ position: "relative" }}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <h6>
                    {" "}
                    Date: <br></br>
                    {schedule && schedule.name}
                  </h6>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                  <h6>
                    {" "}
                    Date: <br></br>
                    {schedule && schedule.count_in_stock}
                  </h6>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={{ span: 9 }}>
              <ListGroup variant="flush">
                <Form onSubmit={handleEditSchedule}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Hours</Form.Label>
                    <Form.Control
                      type="text"
                      id="count_in_stock"
                      name="count_in_stock"
                      className="form-control"
                      value={count_in_stock}
                      onChange={(e) => setCount_in_stock(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="btn btn-warning"
                    disabled={!name}
                  >
                    Post Schedule
                  </Button>
                </Form>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default EditSchedule;
