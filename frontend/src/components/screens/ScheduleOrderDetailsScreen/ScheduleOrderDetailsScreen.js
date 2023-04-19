import React, { useEffect } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import LoadingIconBig from '../../elements/Loader/LoadingIconBig';
import MessageAlert from '../../elements/MessageAlert';
import { getOrderScheduleDetails } from '../../../features/redux/actions/scheduleOrderActions';
import { useParams } from 'react-router';
import * as actionType from '../../../features/redux/constants/scheduleOrderConstants'
import { Link } from 'react-router-dom';

function ScheduleOrderDetailsScreen() {

  const { scheduleOrderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderScheduleDetails(scheduleOrderId));
     // Cleanup function
    return () => {
      dispatch({ type: actionType.SCHEDULE_ORDER_DETAILS_RESET });
    };
  }, [dispatch, scheduleOrderId]);

  const scheduleOrderState = useSelector((state) => state.scheduleOrderState);
  const { scheduleOrder, error, loading } = scheduleOrderState;

  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;

  return (
    <Container className='my-5'>
      <Link to="/my-schedule-orders">
        <Button variant="warning" className='p-3 mb-3'>Back to my list</Button>
      </Link>
      { loading ? (
        <LoadingIconBig />
      ) : error ? (
        <MessageAlert variant="danger">{error}</MessageAlert>
      ) : scheduleOrder && (
        <>
          <div>
            <h2>Schedule Order Id: {scheduleOrder.id}</h2>
          </div>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Tutor</h2>
                  <p>
                    <strong>{scheduleOrder.tutor}</strong>
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Schedules Booked</h2>
                  { scheduleOrder.schedules.length === 0 ? (
                    <MessageAlert variant='secondary'>No schedules selected.</MessageAlert>
                  ) : (
                    <ListGroup variant='flush'>
                      { scheduleOrder.schedules.map(schedule => (
                        <ListGroup.Item key={schedule.id}>
                          <Row>
                            <Col md={4}>
                              {schedule.name}
                            </Col>
                            <Col md={4} >
                              {schedule.quantity}&nbsp;hours&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;{schedule.price.toFixed(2)}&nbsp;Php
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Student's Message</h2>
                  <Row>
                    <Col>
                      {scheduleOrder.message ? (
                        scheduleOrder.message
                      ) : (
                        <span>No message</span>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment</h2>
                  <p>
                    <strong>Payment Method: </strong>
                    {scheduleOrder.payment_method}
                  </p>
                  { scheduleOrder.paid_status ? (
                    <MessageAlert variant='success'>
                      Paid on {scheduleOrder.paid_date ? scheduleOrder.paid_date.substring(0, 10) : null}
                    </MessageAlert>
                  ) : (
                    <MessageAlert variant="secondary">Not yet paid</MessageAlert>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Meeting Session</h2>
                  { scheduleOrder.paid_status ? (
                    <MessageAlert variant='success'>
                      Paid on {scheduleOrder.session_status ? scheduleOrder.paid_date.substring(0, 10) : null}
                    </MessageAlert>
                  ) : (
                    <MessageAlert variant="info">Meeting not yet initialized</MessageAlert>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Total Price:
                      </Col>
                      <Col>
                        {scheduleOrder.total_amount}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                </ListGroup>
                {userInfo && (userInfo.tutor || userInfo.staff) && (
                  <ListGroup.Item>
                    <Button variant="warning" >Mark as Done</Button>
                  </ListGroup.Item>
                )}
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default ScheduleOrderDetailsScreen;