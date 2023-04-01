import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Table, Container, Image } from "react-bootstrap";
import Message from "../../elements/MessageAlert"
import Loader from "../../elements/LoadingIcon";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../../features/redux/actions/authUserActions";
// import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../../../features/redux/constants/constants";
import axios from "axios";
import { useNavigate } from "react-router";


function ProfileScreen() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [file, setFile] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messagee, setMessagee] = useState("");
  const [uploading, setUploading] = useState(false);
  const [bio, setBio] = useState("");
  const [meeting_link, setMeetingLink] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userState);
  const { userInfo } = userLogin;

  const userUpdateProfle = useSelector((state) => state.userUpdateProfle);
  const { success } = userUpdateProfle;

  // const orderListMy = useSelector((state) => state.orderListMy);
  // const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });

        dispatch(getUserDetails("profile"));

        // dispatch(listMyOrders());
      } else {
        setUsername(user.username);
        setFirstName(user.first_name);
        setLastName(user.last_name)
        setEmail(user.email);
        setBio(user.bio)
        setMeetingLink(user.meeting_link)
      }
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/accounts/users/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access && userInfo.token ? userInfo.access + ' ' + userInfo.token : userInfo.access || userInfo.token}`
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    };

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          // profile_picture: file,
          username: username,
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          bio: bio,
          meeting_link: meeting_link,
        })
      );
      setMessagee("Update successfully!");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  
  //BASED SA SUGGESTION NI RAILEY!!!


  //username
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setUsername(user.username);
    }
  }, [user.username]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
    localStorage.setItem('username', e.target.value);
  };


  //first-name
  useEffect(() => {
    const storedFirstName = localStorage.getItem('first_name');
    if (storedFirstName) {
      setFirstName(storedFirstName);
    } else {
      setFirstName(user.first_name);
    }
  }, [user.first_name]);

  const handleFirstname = (e) => {
    setFirstName(e.target.value);
    localStorage.setItem('first_name', e.target.value);
  };

//last-name
useEffect(() => {
  const storedLastName = localStorage.getItem('last_name');
  if (storedLastName) {
    setLastName(storedLastName);
  } else {
    setLastName(user.last_name);
  }
}, [user.last_name]);

const handleLastname = (e) => {
  setLastName(e.target.value);
  localStorage.setItem('last_name', e.target.value);
};

//email
useEffect(() => {
  const storedEmail = localStorage.getItem('email');
  if (storedEmail) {
    setEmail(storedEmail);
  } else {
    setEmail(user.email);
  }
}, [user.email]);

const handleEmail = (e) => {
  setEmail(e.target.value);
  localStorage.setItem('email', e.target.value);
};

//bio
useEffect(() => {
  const storedBio = localStorage.getItem('bio');
  if (storedBio) {
    setBio(storedBio);
  } else {
    setBio(user.bio);
  }
}, [user.bio]);

const handleBio = (e) => {
  setBio(e.target.value);
  localStorage.setItem('bio', e.target.value);
};

   //zoom-link
   useEffect(() => {
    const storedMeetingLink = localStorage.getItem('meeting_link');
    if (storedMeetingLink) {
      setMeetingLink(storedMeetingLink);
    } else {
      setMeetingLink(user.meeting_link);
    }
  }, [user.meeting_link]);

  const handleMeetingLinkChange = (e) => {
    setMeetingLink(e.target.value);
    localStorage.setItem('meeting_link', e.target.value);
  };

  return (
    <Container>
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {messagee && <Message variant="success">{messagee}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        

        <Form onSubmit={submitHandler}>

          <Image src={user.profile_picture} alt={user.name} fluid />

          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file" 
              size="lg" 
              onChange={handleFileChange}
            />
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Plss enter email"
              value={username}
              onChange={handleUsername}
            />
          </Form.Group>

          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder={user.first_name}
              value={first_name}
              onChange={handleFirstname}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder={user.last_name}
              value={last_name}
              onChange={handleLastname}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder={user.email}
              value={email}
              onChange={handleEmail}
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

          <Form.Group controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={user.bio}
                value={bio}
                onChange={handleBio}
              />
            </Form.Group>

            <Form.Group controlId="text">
            <Form.Label>Zoom Link</Form.Label>
            <Form.Control
              required
              type="textarea"
              placeholder={user.meeting_link}
              value={meeting_link}
              onChange={handleMeetingLinkChange}
            />
          </Form.Group>


          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </Col>




      <Col md={9}>
        <h2>Tutoring History</h2>
        {/* {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : ( */}
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

            {/* <tbody>
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
          </tbody> */}
          </Table>
        {/* )} */}
      </Col>
    </Row>
    </Container>
  );
}

export default ProfileScreen;