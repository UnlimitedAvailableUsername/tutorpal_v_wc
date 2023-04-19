import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listScheduleDetails,
  updateSchedule,
} from "../../../features/redux/actions/scheduleAction";

function EditSchedule() {
  const { scheduleId } = useParams();
  const [name, setName] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const dispatch = useDispatch();
  const scheduleDetails = useSelector((state) => state.scheduleDetails);
  const { schedule } = scheduleDetails || {};

  useEffect(() => {
    dispatch(listScheduleDetails(scheduleId));
  }, [dispatch, scheduleId]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("count_in_stock", countInStock);

    dispatch(
      updateSchedule(parseInt(scheduleId), {
        ...(name && { name }),
        ...(countInStock && { count_in_stock: countInStock }),
      })
    );
    
    window.location.reload(); // reload the page
    
  };

  return (
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
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}>Update:</Col>
                  <Col style={{ maxWidth: "90vw", overflowWrap: "break-word" }}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Count in Stock"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />   
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={handleUpdate}
                    > 
                      Update
                    </button>{" "}
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
