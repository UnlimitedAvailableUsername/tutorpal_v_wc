import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link, useNavigate, useParams } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";

/* PAYPAL BUTTONS */
// import { PayPalButton } from "react-paypal-button-v2";

/* COMPONENTS */
import Message from "../../elements/MessageAlert";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  getOrderDetails,
  payOrder,
} from "../../../features/redux/actions/orderAction";

/* ACTION TYPES */
import {
  ORDER_PAY_RESET,
} from "../../../features/redux/constants/orderConstants";
import LoadingIconBig from "../../elements/LoadingIcon";

function OrderScreen() {

  const {orderId} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;

  // ITEMS PRICE GETS CALCULATED ONLY IF WE HAVE AN ORDER
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  // PAYPAL BUTTONS
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYgflmsaM7ccNLPlKUiufIyw8-spOE4UuS5XyyTCvhzheA-1EUcZF9qGlgXBZaSKcP5BY0zTc9WgINKe";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    // IS USER IS NOT LOGGED IN THEN REDIRECT TO LOGIN PAGE
    if (!userInfo) {
      navigate("/login");
    }

    // CHECK IF WE HAVE THE ORDER DETAILS, IF NOT DISPATCH AN ACTION TO GET THE ORDER DETAILS
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });


      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      // ACTIVATING PAYPAL SCRIPTS
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, userInfo]);

  /* HANDLERS */
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

//   const deliverHandler = () => {
//     if (window.confirm("Are you sure you want to mark this order as delivered?")) {
//       dispatch(deliverOrder(order));
//     }
//   };

  return loading ? (
    <LoadingIconBig />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
<div><div><Link to="/admin/orderlist" className="btn btn-dark my-3">
        {" "}
        Go Back
      </Link></div>
  
      <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Name: {order.User.name}</strong>
              </p>

              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.User.email}`}>{order.User.email}</a>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>

              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt ? order.paidAt.substring(0, 10) : null}
                  <br></br>
                    <br></br>
                    <h6>HERE IS THE ZOOM LINK! </h6>
                    <br></br>
                    <br></br>
                    <br></br>
                <h5>{order.meeting_link}</h5>
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>



            <ListGroup.Item>
              <h2>Order Items</h2>

              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/schedules/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ₱{item.price} = ₱
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Number of Hours:</Col>

                  <Col>{order.qty}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>

                  <Col>₱{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {/* {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    // <PayPalButton
                    //   amount={order.totalPrice}
                    //   onSuccess={successPaymentHandler}
                    // />
                  )} */}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
  );
}

export default OrderScreen;
