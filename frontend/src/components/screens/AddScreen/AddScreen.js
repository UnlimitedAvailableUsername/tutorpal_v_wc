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

export default AddScreen;
