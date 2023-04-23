import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Table, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSchedule, deleteSchedule, listMySchedules } from "../../../features/redux/actions/scheduleAction";
import backgroundImage from  '../../../assets/components/screens/ScheduleScreen/secret.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

function MyScheduleScreenTutor() {
  const [name, setName] = useState("");
  const [count_in_stock, setCount_in_stock] = useState("");
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scheduleList = useSelector((state) => state.scheduleList);
  const { schedules } = scheduleList;

  useEffect(() => {
    dispatch(listMySchedules());
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
      navigate("/myschedule");
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

  const handleDelete = async (scheduleId) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        const schedule = schedules.find((schedule) => schedule.id === scheduleId);
        await dispatch(deleteSchedule(scheduleId, schedule));
        navigate("/myschedule");
        window.location.reload(); // <-- add this line
      } catch (error) {
        console.log(error);
        // handle error
      }
    }
  };

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '95vh',
    backgroundAttachment: 'fixed',
  }; 

  return (

    
    <div style={backgroundStyles}>

      <style jsx>{`
        .card {
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }

        .one {
          display: flex;
          justify-content: center;
        }
      `}</style>
      
      <br/><br/><br/>
      <Card style={{width: 900, margin: 'auto'}} className='card px-5   p-3 mb-5 rounded'>
      <div className="text" variant="light">

        <br/>
        <h5>MY SCHEDULES:</h5>
      </div>
<br/>
      <Table striped responsive className="table-m-2 ">
        <thead>
          <tr>
            <th style={{textAlign: 'center'}} >Date</th>
            <th style={{textAlign: 'center'}}>Hours Available</th>
            <th style={{textAlign: 'center'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {schedules &&
            schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td style={{textAlign: 'center'}}>{schedule.name}</td>
                <td style={{textAlign: 'center'}}>{schedule.count_in_stock}</td>
                <td style={{textAlign: 'center'}}>
                  <Link to={`/schedule-details/${schedule.id}`}>
                    <button type="button" className="btn btn-warning me-2">
                    <FontAwesomeIcon icon={ faEdit } />
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(schedule.id)}
                  >
                    <FontAwesomeIcon icon={ faDeleteLeft } />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <br />

      <div className="d-flex justify-content-center align-items-center">
        {!showForm && (
          <Button
            className="btn btn-warning btn-outline my-3 "
            style={{textShadow:'2px 2px 2px rgba(0, 0, 0, 0.2)' }}
        
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
            className="btn btn-warning btn-outline my-3"
            style={{textShadow:'2px 2px 2px rgba(0, 0, 0, 0.2)' }}
            onClick={handleHideForm}
          >
            Hide
          </Button>

          <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
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
            </Col> 
<Col>
            <Form.Group className="mb-3">
              <Form.Label>Hours</Form.Label>
              <Form.Control
                type="number"
                id="count_in_stock"
                name="count_in_stock"
                className="form-control"
                value={count_in_stock}
                onChange={(e) => setCount_in_stock(e.target.value)}
              />
            </Form.Group>
            </Col>
            </Row>
            <Button
              type="submit"
              style={{width: 130, marginLeft: 325, textShadow:'2px 2px 2px rgba(0, 0, 0, 0.2)' }}
              className="btn btn-warning mb-3"
              disabled={!name || parseInt(count_in_stock) < 1}
            >
              Post Schedule
            </Button>
          </Form>
        </Container>
      )}
      </Card>
    </div>
  );
}

export default MyScheduleScreenTutor;
