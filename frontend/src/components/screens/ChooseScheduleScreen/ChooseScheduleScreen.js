import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link, } from 'react-router-dom';
import { createOrderSchedule } from '../../../features/redux/actions/scheduleOrderActions';
import { listSchedules } from '../../../features/redux/actions/scheduleAction';
import { Button, Container, Form, FormControl, InputGroup, Spinner, Table, Card  } from 'react-bootstrap';
import LoadingIconBig from '../../elements/Loader/LoadingIconBig';
import MessageAlert from '../../elements/MessageAlert';
import * as actionType from '../../../features/redux/constants/scheduleOrderConstants'
import backgroundImage from  '../../../assets/components/screens/ScheduleScreen/secret.png'


function ChooseScheduleScreen() {
  const [formData, setFormData] = useState({
    items: [],
    payment_method: 'PayPal',
  });

  const { tutorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  useEffect(() => {
    dispatch({ type: actionType.SCHEDULE_ORDER_CREATE_RESET });
  }, [dispatch]);

  useEffect(() => {
    dispatch(listSchedules(tutorId));
  }, [dispatch, tutorId]);
  
  const { loading: schedulesLoading, error: schedulesError, schedules } = useSelector((state) => state.scheduleList);
  const { loading: orderLoading, error: orderError, scheduleOrder } = useSelector((state) => state.scheduleOrderState);


  useEffect(() => {
    if (scheduleOrder && Object.keys(scheduleOrder).length > 0) {
      const scheduleOrderId = scheduleOrder.id;
      navigate(`/my-schedule-orders/${scheduleOrderId}`);
    }
  }, [scheduleOrder, navigate]);


  const handleInputChange = (e, schedule) => {
    const { name, value, checked } = e.target;

    const items = [...formData.items];
    const itemIndex = items.findIndex((item) => item.schedule === schedule.id);

    if (name.startsWith('schedule_')) {
      if (!checked && itemIndex !== -1) {
        items.splice(itemIndex, 1);
        // clear the quantity input value
        const quantityInput = document.getElementsByName(`quantity_${schedule.id}`)[0];
        quantityInput.value = "0";
      } else if (checked && itemIndex === -1) {
        const newItem = {
          schedule: schedule.id,
          quantity: 1,
        };
        // If the input quantity was previously zero, set it to 1
        const quantityInput = document.getElementsByName(`quantity_${schedule.id}`)[0];
        if (quantityInput.value === "0") {
          quantityInput.value = "1";
          newItem.quantity = 1;
        }
        items.push(newItem);
      }
    } else if (name.startsWith('quantity_')) {
      const quantity = parseInt(value) || 0;
      if (quantity === 0) {
        if (itemIndex !== -1) {
          items.splice(itemIndex, 1);
        }
        const checkbox = document.getElementsByName(`schedule_${schedule.id}`)[0];
        checkbox.checked = false;
      } else {
        if (itemIndex === -1) {
          items.push({
            schedule: schedule.id,
            quantity,
          });
        } else {
          items[itemIndex].quantity = quantity;
        }
      }
    }

    setFormData({
      ...formData,
      items,
    });
  };

  const handleIncrement = (schedule) => {
    const quantityInput = document.getElementsByName(`quantity_${schedule.id}`)[0];
    const currentValue = parseInt(quantityInput.value) || 0;
    const newValue = currentValue + 1;
    quantityInput.value = newValue.toString();
    handleInputChange({ target: quantityInput }, schedule);
  };

  const handleDecrement = (schedule) => {
    const quantityInput = document.getElementsByName(`quantity_${schedule.id}`)[0];
    const currentValue = parseInt(quantityInput.value) || 0;
    const newValue = currentValue > 0 ? currentValue - 1 : 0;
    quantityInput.value = newValue.toString();
    handleInputChange({ target: quantityInput }, schedule);
  };

  const handlePaymentMethodChange = (e) => {
    setFormData({
      ...formData,
      payment_method: e.target.value,
    });
  };

  const handleMessageChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      tutor: parseInt(tutorId)
    };
    console.log(updatedFormData);
    dispatch(createOrderSchedule(updatedFormData));
  };

  const calculateTotalPrice = () => {
    return formData.items.reduce((total, item) => {
      const { schedule } = item;
      const selectedSchedule = schedules.schedules.find((s) => s.id === schedule);
      const quantity = item.quantity; // default to 1 if quantity is not set
      return total + parseFloat(selectedSchedule.price) * quantity;
    }, 0);
  };

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "200vh",
    backgroundAttachment: "fixed",
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
    <Container>
      <Button as={Link} to={`/tutor/${tutorId}`} variant="warning" className="btn-outline-dark py-3 my-5" >&lt; Go back to tutor details</Button>
      {schedulesLoading ? (
        <LoadingIconBig />
      ) : schedulesError ? (
        <MessageAlert variant='danger'>{schedulesError}</MessageAlert>
      ) : schedules && (
        <>
        <Card style={{width: 1100, height: 'auto', margin: 'auto'}} className='card px-5   p-1 mb-5 rounded'>
          <br/><br/>
          <h2>CHOOSE AMONG THE SCHEDULES OF:</h2>
          <h3><MessageAlert variant="secondary">{schedules.user}</MessageAlert></h3>
          <h3>HOURLY RATE OF: <MessageAlert variant="secondary"><b>{schedules.price_rate_hour} Php</b></MessageAlert></h3>
          <Form onSubmit={handleSubmit}>
            <Table striped bordered hover>
              <thead>
                <tr style={{textAlign: 'center'}}>
                  <th style={{textAlign: 'center'}}>Schedule Date</th>
                  <th>Available Hours</th>
                  <th>How many hours?</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {schedules &&
                  schedules.schedules.filter((schedule) => schedule.count_in_stock > 0).map((schedule) => (
                    <tr style={{textAlign: 'center'}} key={schedule.id}>
                      <td>{schedule.name}</td>
                      <td><b>{schedule.count_in_stock}</b></td>
                      <td>
                        <InputGroup>
                          <FormControl
                            type="number"
                            inputMode="numeric"
                            name={`quantity_${schedule.id}`}
                            style={{ flex: "1", width: "0.25em", borderRadius: '8px' }}
                            min={0}
                            max={schedule.count_in_stock}
                            disabled={
                              !formData.items.some((item) => item.schedule === schedule.id) && !formData.items.find((item) => item.schedule === schedule.id)?.quantity
                            }
                            defaultValue={
                              formData.items.find((item) => item.schedule === schedule.id)?.quantity ?? (formData.items.some((item) => item.schedule === schedule.id) ? 1 : '')
                            }
                            onChange={(e) => handleInputChange(e, schedule)}
                          />
                          <div style={{ display: 'flex' }}>
                            <Button style={{height: 45}} variant="danger" className="me-1 ms-1" onClick={() => handleDecrement(schedule)} ><b>-</b></Button>
                            <Button style={{height: 45}} variant="warning" onClick={() => handleIncrement(schedule)}><b>+</b></Button>
                          </div>
                        </InputGroup>
                      </td>
                      <td >
                        <Form.Check
                          type="checkbox"
                          label=""
                          name={`schedule_${schedule.id}`}
                          onChange={(e) => handleInputChange(e, schedule)}
                         
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <h3>PAYMENT METHOD:</h3>
            <MessageAlert variant="secondary">
            <Form.Group>
              <Form.Check
                type="radio"
                label="PayPal"
                name="payment_method"
                value="PayPal"
                checked={formData.payment_method === 'PayPal'}
                onChange={handlePaymentMethodChange}
              />
            </Form.Group>
            </MessageAlert>
            <Form.Group>
              <Form.Label htmlFor="message">Do you have additional notes for the tutor?</Form.Label>
              <Form.Control
                id="message"
                as="textarea"
                name="message"
                style={{ resize: 'vertical' }}
                value={formData.message}
                onChange={handleMessageChange}
              />
            </Form.Group>
            {orderError && !orderLoading && <MessageAlert variant='danger'>{orderError}</MessageAlert>}
            <Button variant="warning" className="mb-5"  style={{width: 500, marginLeft: 250}} type="submit" disabled={!formData.items.length}>
              {orderLoading ? (
                <span>
                  <Spinner animation="border" size="sm" /> Placing Order...
                </span>
              ) : (
                'Place Order - Total Price: Php: ' + calculateTotalPrice()
              )}
            </Button>
          </Form>
          </Card>
        </>
      )}
    </Container>
    </div>
  );
}

export default ChooseScheduleScreen;
