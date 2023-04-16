import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Container, } from "react-bootstrap";
import { Link, useParams, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listScheduleDetails, updateSchedule, } from "../../../features/redux/actions/scheduleAction";

function EditSchedule() {
  const { scheduleId } = useParams();
  const [name, setName] = useState("");
  const [count_in_stock, setCountInStock] = useState("");

  const dispatch = useDispatch();
  const scheduleDetails = useSelector((state) => state.scheduleDetails);
  const { schedule } = scheduleDetails || {};

  useEffect(() => {
    dispatch(listScheduleDetails(scheduleId));
  }, [dispatch, scheduleId]);

  const EditSchedule = async () => {
    let formField = new FormData();

    formField.append("name", name);
    formField.append("count_in_stock", count_in_stock);

    dispatch(EditSchedule({ scheduleId: parseInt(scheduleId), ...(name && {name}), ... (count_in_stock && {count_in_stock}) }))
  };
  return (
    <div>
      

      <Container>
        <Link to="/myschedule" className="btn btn-warning btn-outline-dark py-3 my-5"  >My schedules</Link>
        <Row>

        <Col md={{ span: 3 }} style={{ position: "relative" }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <h6> Date: <br></br>
                {schedule && schedule.name}
                </h6>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <h6> Date: <br></br>
                {schedule && schedule.count_in_stock}
                </h6>
              </ListGroup.Item>

            </ListGroup>
          </Col>

          <Col md={{ span: 9 }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}> Name:</Col>
                  <Col style={{ maxWidth: "90vw", overflowWrap: "break-word" }}>
                  {schedule && schedule.name}
                  </Col>
                </Row>

                <Row>
                  <Col md={{ span: 2 }}> Hours Remaining:</Col>
                  <Col style={{ maxWidth: "90vw", overflowWrap: "break-word" }}>
                  {schedule && schedule.count_in_stock}
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

export default EditSchedule;