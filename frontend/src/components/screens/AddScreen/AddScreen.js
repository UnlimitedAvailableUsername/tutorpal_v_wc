<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSchedule } from "../../../features/redux/actions/scheduleAction";
import { listSchedules } from "../../../features/redux/actions/scheduleAction";
import HeaderHome from "../../elements/HeaderHomePage";
import HeaderStudent from "../../elements/HeaderStudent";
import HeaderTutor from "../../elements/HeaderTutor";

function AddScreen() {
  const [name, setName] = useState("");
  const [count_in_stock, setCount_in_stock] = useState("");
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userState);
  const { userInfo } = userLogin;

  const scheduleList = useSelector((state) => state.scheduleList);
  const { schedules } = scheduleList || {};

  useEffect(() => {
    dispatch(listSchedules());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name && parseInt(count_in_stock) < 1) {
      console.log("Please enter a date and a valid hour.");
      return;
    }

    try {
      const formField = new FormData();
      formField.append("name", name);
      formField.append("count_in_stock", count_in_stock);

      await dispatch(createSchedule(formField));
      navigate("/add-lesson");
      window.location.reload(); // <-- add this line
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      {userInfo && (userInfo.tutor || userInfo.user?.tutor) && <HeaderTutor />}

      {userInfo && (userInfo.student || userInfo.user?.student) && (
        <HeaderStudent />
      )}

      {!userInfo && <HeaderHome />}

      <div className="text" variant="light">
        <h5>My Schedules:</h5>
      </div>

      <Table striped responsive className="table-m-2">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {schedules &&
            schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.name}</td>
                <td>{schedule.count_in_stock}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <br />

      <div className="d-flex justify-content-center align-items-center">
        {!showForm && (
          <Button
            className="btn btn-warning btn-outline-dark my-3"
            onClick={handleShowForm}
            size="lg"
          >
            Add Schedule
          </Button>
        )}
      </div>

      {showForm && (
        <Container>
          <Button
            className="btn btn-warning btn-outline-dark my-3"
            onClick={handleHideForm}
          >
            Hide
          </Button>

          <Form onSubmit={handleSubmit}>
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
              disabled={!name || parseInt(count_in_stock) < 1}
            >
              Post Schedule
            </Button>
          </Form>
        </Container>
      )}
    </div>
  );
}

>>>>>>> master
export default AddScreen;
