import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Container, Image, Card } from "react-bootstrap";
import Message from "../../elements/MessageAlert"
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../../features/redux/actions/authUserActions";
// import { listMyOrders } from "../actions/orderActions";
import axios from "axios";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import * as profileActionType from '../../../features/redux/constants/authConstants';
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import LoadingIconRegular from "../../elements/Loader/LoadingIconRegular";

import HeaderTutor from '../../elements/HeaderTutor'
import HeaderStudent from '../../elements/HeaderStudent'

function ProfileScreen() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile_picture, setProfilePicture] = useState("")

  const [message, setMessage] = useState("");
  
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userState);
  const { userInfo } = userLogin;

  const userUpdateProfle = useSelector((state) => state.userUpdateProfle);
  const { success } = userUpdateProfle;


  // THIS WILL RUN FIRST
  // 1. CHECKS THE userInfo IF THERE ARE DATA, IF NOT REDIRECT TO LOGIN
  // 2. IF YES, THEN DISPATCH AN ACTION THAT WILL RESET PROFILE FIELDS TO NULL THEN GET USER DETAILS
  // Notes:
  // THIS useEffect WILL ONLY RUN ONCE AFTER THE PROFILE SCREEN COMPONENT LOAD ON THE USER SCREEN.

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || userInfo._id !== user._id) {
        dispatch({ type: profileActionType.USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setProfilePicture(user.profile_picture)
        setUsername(user.username);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setBio(user.bio);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);


  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/accounts/users/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`
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
          username: username,
          first_name: first_name,
          last_name: last_name,
          email: email,
          bio: bio,
          password: password,
        })
      );
      setEditMode(false);
      setMessage("Updated your profile successfully!");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEditButton = (e) => {
    setEditMode(true);
  }

  const handleCancelButton = (e) => {
    setEditMode(false);
  }

  const handleClickOnProfilePicture = (e) => {
    document.getElementById("profilePicture").click();
  }

  const subjectNamesById = {
		1: "Mathematics",
		2: "Science",
		3: "English",
		4: "History",
	};

  return (
<>
    {userInfo && (userInfo.tutor || userInfo.user?.tutor) && (
      <HeaderTutor/>
    ) }

    {userInfo && (userInfo.student || userInfo.user?.student) && (
      <HeaderStudent/>
    ) }

    <Container>
      <Row>
        <Col>
          <h2>User Profile</h2>

          {message && success && <Message variant="success">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <LoadingIconBig />}

          {editMode ? (
            <div>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="formFileLg" className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    id="profilePicture"
                    size="lg"
                    onChange={handleFileChange}
                  />
                  <Row>
                    <Image
                      src={profile_picture}
                      alt="This is my kingdom cum"
                      onClick={handleClickOnProfilePicture}
                    />
                  </Row>
                  {uploading && <LoadingIconRegular />}
                </Form.Group>

                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    placeholder="first_name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    placeholder="Last Name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="bio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    placeholder="Enter your Bio here"
                    value={bio}
                    onChange={(e) => setLastName(e.target.value)}
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
                <Button variant="warning" disabled={loading} type="submit" >Update</Button>
              </Form>
              <Button variant="warning" onClick={handleCancelButton} >Cancel</Button>
            </div>
          ) : (


            <div>
              {user && (
              
<Row>

   
    <Row xs={7}>
            
             <Col>


            <Card className=" my-2 p-3 rounded" style={{backgroundColor: "#565656", width: 286, height: 448}}>
              <Row>
                <Col>
                  <p>
                    <img src={user.profile_picture} style={{width: 250}} alt="Profile" />
                  </p>
                  <Row>
                    <Col>
                      <pre style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 3}}><strong>Username:</strong>  {user.username}</pre>
                    </Col>
                    <Col>
                      <pre style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 3}}><strong>Email:</strong>  {user.email}</pre>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <pre style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 3}}><strong>First Name:</strong>  {user.first_name}</pre>
                    </Col>
                    <Col>
                      <pre style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 3}}><strong>Last Name:</strong>  {user.last_name}</pre>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <pre style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 3}}><strong>Contact:</strong>  {user.contact}</pre>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>


            {userInfo && userInfo.tutor ? (

              <Col xs={9}>
                <Card className=" my-2 p-3 rounded" style={{backgroundColor: "#565656", width: 963, height: 448}}>
                  <Row>
                    <Col>
                      <p style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 6 }}><strong>Bio:</strong>  {user.bio}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <pre style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 3}}><strong>Subjects:</strong>  {user.subjects && user.subjects.map((subjectId, index) => (
                        <span key={subjectId}>
                          {subjectNamesById[subjectId]}
                          {index < user.subjects.length - 1 ? ", " : ""}
                        </span>
                      ))}</pre>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <pre style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 6 }}><strong>Meeting Link:</strong>  {user.meeting_link}</pre>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 6 }}><strong>Schedules:</strong>  {user.schedules}</p>
                    </Col>
                  </Row>
                </Card>
              </Col>

            ) : (

                <Card className=" my-2 p-3 rounded" style={{backgroundColor: "#565656", width: 990, height: 448, marginRight: 10}}>
              <h5>TUTORING History</h5>
              <br/>

              <table>
                <thead>
                  <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                    <th>Column 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 1, Column 2</td>
                    <td>Row 1, Column 3</td>
                  </tr>
                  <tr>
                    <td>Row 2, Column 1</td>
                    <td>Row 2, Column 2</td>
                    <td>Row 2, Column 3</td>
                  </tr>
                  <tr>
                    <td>Row 3, Column 1</td>
                    <td>Row 3, Column 2</td>
                    <td>Row 3, Column 3</td>
                  </tr>
                  <tr>
                    <td>Row 4, Column 1</td>
                    <td>Row 4, Column 2</td>
                    <td>Row 4, Column 3</td>
                  </tr>
                </tbody>
              </table>
                </Card>



  
)}


</Row>

            <Button variant="warning" onClick={handleEditButton}>
                <FontAwesomeIcon icon={faPenToSquare} /> Edit
              </Button>


    
        </Row>
      )}
            </div>
          )} 
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default ProfileScreen;