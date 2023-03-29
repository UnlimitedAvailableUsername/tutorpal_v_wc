import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import Message from "../../elements/MessageAlert"
import Loader from "../../elements/LoadingIcon";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import axios from "axios";

function ProfileScreen({ history }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [file, setFile] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfle = useSelector((state) => state.userUpdateProfle);
  const { success } = userUpdateProfle;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });

        dispatch(getUserDetails("profile"));

        dispatch(listMyOrders());
      } else {
        setUsername(user.username);
        setFirstName(user.first_name);
        setLastName(user.last_name)
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          profile_picture: file,
          username: username,
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  const uploadFileHandler = async (e) => {
    setFile(e.target.files[0]);
    
    const formData = new FormData();
    formData.append("profile_picture", file);

    setUploading(true);

    try {
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/users/upload/",
        formData,
        config
      );
      setFile(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };


  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>

          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file" 
              size="lg" 
              onChange={uploadFileHandler}
            />
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="first_name"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="last_name"
              placeholder="Last Name"
              value={first_name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>Tutoring History</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-m-2">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Student</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.createdAt ? order.createdAt.substring(0, 10) : null}
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt ? (
                        order.paidAt.substring(0, 10)
                      ) : null
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                  {order.orderItems.map((item) => (
                    <div key={item._id}>{item.name}</div>
                  ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;