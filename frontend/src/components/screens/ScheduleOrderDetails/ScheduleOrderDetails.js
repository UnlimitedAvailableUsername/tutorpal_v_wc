import React, { useEffect } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import LoadingIconBig from '../../elements/Loader/LoadingIconBig';
import MessageAlert from '../../elements/MessageAlert';
import { getOrderScheduleDetails } from '../../../features/redux/actions/scheduleOrderActions';
import { useParams } from 'react-router';

function ScheduleOrderDetails() {

  const { scheduleOrderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderScheduleDetails(scheduleOrderId));
  }, [dispatch, scheduleOrderId]);

  const scheduleOrderState = useSelector((state) => state.scheduleOrderState);
  const { scheduleOrder, error, loading } = scheduleOrderState;

  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;

  return (
    <Container>
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
                            <Col md={1}>
                              {schedule.name}
                            </Col>
                            <Col md={4}>
                              {schedule.quantity} x {schedule.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
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

export default ScheduleOrderDetails