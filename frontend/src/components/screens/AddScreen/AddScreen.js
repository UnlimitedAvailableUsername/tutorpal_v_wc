import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddSchedule } from "../../../features/redux/actions/scheduleAction";


function AddScreen() {
  const [date, setDate] = useState("");
  const [count_in_stock_hour, setCount_in_stock_hour] = useState("");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Post = async () => {
    let formField = new FormData();

    formField.append("date", date);
    formField.append("stock", count_in_stock_hour);


    dispatch(AddSchedule(formField)).then((response) => {
      navigate("/add-schedule");
    });
  };

  return (
    <div>
      <div className="text-center" variant="light">
        <h1>Add Schedule</h1>
      </div>
      <Container>
        <Link
          to="/"
          className="btn btn-warning btn-outline-dark my-3  "
        >
          Fuck, Go Back
        </Link>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              id="date"
              name="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of Hours</Form.Label>
            <Form.Control
              type="text"
              id="stock"
              name="stock"
              className="form-control"
              value={count_in_stock_hour}
              onChange={(e) => setCount_in_stock_hour(e.target.value)}
            />
          </Form.Group>

          <Button className="btn btn-primary" onClick={Post}>
            Post Lesson
          </Button>
        </Form>
      </Container>
    </div>
  );
}
export default AddScreen;
