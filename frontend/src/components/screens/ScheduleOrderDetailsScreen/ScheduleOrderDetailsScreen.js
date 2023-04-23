import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import {
  getOrderScheduleDetails,
  markAsDoneScheduleOrder,
  payScheduleOrder,
} from "../../../features/redux/actions/scheduleOrderActions";
import { useParams } from "react-router";
import * as actionType from "../../../features/redux/constants/scheduleOrderConstants";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from "../../../config";

function ScheduleOrderDetailsScreen() {
  const [payPalError, setPayPalError] = useState(null);

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

  const initialOptions = {
    "client-id": `${PAYPAL_CLIENT_ID}`,
    currency: "PHP",
  };

  const handleSessionButton = (event) =>{
    event.preventDefault();
    dispatch(markAsDoneScheduleOrder(scheduleOrderId));
    dispatch(getOrderScheduleDetails(scheduleOrderId));
  }

  const paypalOrderApproved = (data, actions) => {
    dispatch(payScheduleOrder(scheduleOrderId));
    dispatch(getOrderScheduleDetails(scheduleOrderId))
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${scheduleOrder.total_amount}`,
          },
        },
      ],
    });
  };

  const paypalHandleError = (err) => {
    setPayPalError(err.message);
  };

  const paypalCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${scheduleOrder.total_amount}`,
          },
        },
      ],
    });
  };

  return (
    <Container className="mb-5">
{(userInfo.tutor || userInfo.student) && !userInfo.staff ? (
  <Link
    to={
      userInfo.tutor
        ? `/my-students/${scheduleOrder && scheduleOrder.user}`
        : "/my-schedule-orders"
    }
  >
    <Button variant="warning" style={{ color: 'black' }} className="btn-outline py-3 my-5 ">
      {userInfo.tutor ? (
        <>&lt; Student Details</>
      ) : (
        <>&lt; Back to booked schedules</>
      )}
    </Button>
  </Link>
) : null}



      {userInfo.staff  && <Button as={Link} to={`/all-order-list`} className="btn-outline py-3 my-5 " variant="warning " style={{color: 'black'}}>Back to Orders</Button>}

      {loading ? (
        <LoadingIconBig />
      ) : error ? (
        <MessageAlert variant="danger">{error}</MessageAlert>
      ) : (
        scheduleOrder && (
          <>
            <div className="mb-5">
              <h2>
                <strong>BOOKING ORDER ID: {scheduleOrder.id}</strong>
              </h2>
            </div>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  {userInfo.student && (
                    <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                      <h2>TUTOR</h2>
                      <Row>
                        <Col md={15}>
                          <h4>
                            {scheduleOrder.tutor ? (
                              <Row>
                                
                                <Col>
                                
                                <MessageAlert variant='dark'>
                                <Row>
                                  <Col md={2}>
                                <img
                                src={scheduleOrder.tutor.profile_picture}
                                style={{ width: 120, height: 90}}
                                alt="Profile"
                              /> </Col>
                                  <Col>
                                  <p>
                                    {scheduleOrder.tutor.first_name}&nbsp;
                                    {scheduleOrder.tutor.last_name}
                                  </p>
                                  <p>{scheduleOrder.tutor.email}</p>
                                  </Col>
                                  </Row> 
                                  
                                  </MessageAlert>
                                </Col>
                              </Row>
                            ) : (
                              <Row>
                                <Col>Multo</Col>
                              </Row>
                            )}
                          </h4>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                    <h2>SCHEDULES BOOKED</h2>
                    {scheduleOrder.schedules.length === 0 ? (
                      <MessageAlert variant="secondary">
                        No schedules selected.
                      </MessageAlert>
                    ) : (
                      <ListGroup variant="flush">
                        {scheduleOrder.schedules.map((schedule) => (
                          <ListGroup.Item key={schedule.id}>
                            <Row>
                              <Col md={4}>{schedule.name}</Col>
                              <Col md={4}>
                                {schedule.quantity}
                                &nbsp;hours&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
                                {parseFloat(schedule.price).toFixed(2)}&nbsp;Php
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                    <h2>STUDENT'S MESSAGE</h2>
                    <Row>
                      <Col >
                      <MessageAlert variant="dark">
                        {scheduleOrder.message ? (
                          scheduleOrder.message
                        ) : (
                          <span>No message</span>
                        )}
                        </MessageAlert>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                    <h2>PAYMENT</h2>
                    <p>
                      <strong>Payment Method: </strong>
                      {scheduleOrder.payment_method}
                    </p>
                    {scheduleOrder.paid_status ? (
                      <MessageAlert variant="success">
                        Paid on{" "}
                        {scheduleOrder.paid_date
                          ? scheduleOrder.paid_date.substring(0, 10)
                          : null}
                      </MessageAlert>
                    ) : (
                      <MessageAlert variant="dark">Not yet paid</MessageAlert>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                    <h2>MEETING SESSION</h2>
                    {!scheduleOrder.paid_status &&
                      !scheduleOrder.session_status && (
                        <>
                          {scheduleOrder.tutor && (
                            <Row>
                              <Col>
                                <p>Meeting Link: </p>
                                <p>
                                  {scheduleOrder.tutor.meeting_link
                                    ? scheduleOrder.tutor.meeting_link
                                    : "Not available"}
                                </p>
                              </Col>
                            </Row>
                          )}
                        </>
                      )}
                    {scheduleOrder.session_status ? (
                      <MessageAlert variant="success">
                        Session has been completed.
                      </MessageAlert>
                    ) : (
                      <MessageAlert variant="dark">
                        Session has not yet happened.
                      </MessageAlert>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={4}>
                <Card style={{textAlign: 'center'}} className="p-2">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>ORDER SUMMARY</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col><h4>Total Price:</h4></Col>
                        <Col><h4>
                          {parseFloat(scheduleOrder.total_amount).toFixed(2)}
                          &nbsp;&nbsp;Php</h4>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {!scheduleOrder.paid_status && userInfo.student && (
                      <PayPalScriptProvider options={initialOptions}>
                        <div
                          style={{
                            backgroundColor: "white",
                            padding: "12px",
                            borderRadius: "5px",
                          }}
                        >
                          <PayPalButtons
                            style={{
                              color: "black",
                              shape: "pill",
                              height: 55,
                              layout: "vertical",
                              tagline: "false",
                            }}
                            createOrder={paypalCreateOrder}
                            onApprove={paypalOrderApproved}
                            onError={paypalHandleError}
                          />
                        </div>
                        {payPalError && (
                          <MessageAlert variant="danger">
                            {payPalError}
                          </MessageAlert>
                        )}
                      </PayPalScriptProvider>
                    )}
                  </ListGroup>
                  {userInfo && (userInfo.tutor || userInfo.staff) && !scheduleOrder.session_status && (
                    <ListGroup.Item>
                      <Button
                        className="btn-outline w-100"
                        variant="warning"
                        disabled={!scheduleOrder.paid_status}
                        onClick={handleSessionButton}
                        style={{color: 'black'}}
                      >
                       Mark Session as Done
                      </Button>
                    </ListGroup.Item>
                  )}
                </Card>
              </Col>
            </Row>
          </>
        )
      )}
    </Container>
  );
}

export default ScheduleOrderDetailsScreen;
