import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Container, Image, Card, } from "react-bootstrap";
import Message from "../../elements/MessageAlert";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile, } from "../../../features/redux/actions/authUserActions";
import axios from "axios";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import * as profileActionType from "../../../features/redux/constants/authUserConstants";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import LoadingIconRegular from "../../elements/Loader/LoadingIconRegular";


function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile_picture, setProfilePicture] = useState("");

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




  

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: profileActionType.USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setProfilePicture(user.profile_picture);
        setUsername(user.username);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setBio(user.bio);
        setEmail(user.email);
        setPassword(user.password);
      }
    }
  }, []);



//BASED SA SUGGESTION NI RAILEY!!!


  //username
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else if (user.username) {
      setUsername(user.username);
    }
  }, [user.username]);
  const handleUsername = (e) => {
    setUsername(e.target.value);
    localStorage.setItem('username', e.target.value);
  };

  // Listen for logout event and remove 'username' from local storage
useEffect(() => {
  const handleLogout = () => {
    localStorage.removeItem('username');
  };
  window.addEventListener('logout', handleLogout);
  return () => {
    window.removeEventListener('logout', handleLogout);
  };
}, []);

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

// Listen for logout event and remove 'first_name' from local storage
useEffect(() => {
  const handleLogout = () => {
    localStorage.removeItem('first_name');
  };
  window.addEventListener('logout', handleLogout);
  return () => {
    window.removeEventListener('logout', handleLogout);
  };
}, []);

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

// Listen for logout event and remove 'last_name' from local storage
useEffect(() => {
  const handleLogout = () => {
    localStorage.removeItem('last_name');
  };
  window.addEventListener('logout', handleLogout);
  return () => {
    window.removeEventListener('logout', handleLogout);
  };
}, []);


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

// Listen for logout event and remove 'email' from local storage
useEffect(() => {
  const handleLogout = () => {
    localStorage.removeItem('email');
  };
  window.addEventListener('logout', handleLogout);
  return () => {
    window.removeEventListener('logout', handleLogout);
  };
}, []);


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

// Listen for logout event and remove 'bio' from local storage
useEffect(() => {
  const handleLogout = () => {
    localStorage.removeItem('bio');
  };
  window.addEventListener('logout', handleLogout);
  return () => {
    window.removeEventListener('logout', handleLogout);
  };
}, []);


//    //zoom-link
//    useEffect(() => {
//     const storedMeetingLink = localStorage.getItem('meeting_link');
//     if (storedMeetingLink) {
//       setMeetingLink(storedMeetingLink);
//     } else {
//       setMeetingLink(user.meeting_link);
//     }
//   }, [user.meeting_link]);

//   const handleMeetingLinkChange = (e) => {
//     setMeetingLink(e.target.value);
//     localStorage.setItem('meeting_link', e.target.value);
//   };

//   // Listen for logout event and remove 'zoom_link' from local storage
// useEffect(() => {
//   const handleLogout = () => {
//     localStorage.removeItem('meeting_link');
//   };
//   window.addEventListener('logout', handleLogout);
//   return () => {
//     window.removeEventListener('logout', handleLogout);
//   };
// }, []);



  if (loading) {
    // Render loading indicator or return null
    return <LoadingIconRegular />;
  }

  if (error) {
    // Render error message or return null
    return <Message variant="danger">{error}</Message>;
  }



  

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/users/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }

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





  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEditButton = (e) => {
    setEditMode(true);
  };

  const handleCancelButton = (e) => {
    setEditMode(false);
  };




  
  const handleClickOnProfilePicture = (e) => {
    document.getElementById("profilePicture").click();
  };

  let subjectList;

  if (user && user.subjects) {
    subjectList = user.subjects.map((subject) => (
      <div key={subject.id}>
        <p>{subject.subject_title}</p>
      </div>
    ));
  };


  

  

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h2>User Profile</h2>

            {message && success && (
              <Message variant="success">{message}</Message>
            )}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <LoadingIconBig />}

            {editMode ? (
              <div>
                <>
                  {userInfo && userInfo.tutor ? (
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
                            src={user.profile_picture}
                            alt="This is my kingdom cum"
                            onClick={handleClickOnProfilePicture}
                            style={{ height: 100, width: 150 }}
                          />
                        </Row>
                        {uploading && <LoadingIconRegular />}
                      </Form.Group>

                      <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        required
                        type='name'
                        value={username}
                        onChange={handleUsername}
                      />
                    </Form.Group>

                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          required
                          placeholder={user.first_name}
                          value={first_name}
                          onChange={handleFirstname}
                        />
                      </Form.Group>

                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          required
                          placeholder="Last Name"
                          value={last_name}
                          onChange={handleLastname}
                        />
                      </Form.Group>

                      <Form.Group controlId="bio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                          required
                          as="textarea"
                          placeholder="Enter your Bio here"
                          value={bio}
                          onChange={handleBio} // fixed typo in function name
                        />
                      </Form.Group>

                      <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          required
                          type="email"
                          placeholder="Enter Email"
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
                          onChange={(e) => setPassword(e.target.value)} // fixed typo in function name
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
                      <Button
                        style={{ width: 100, margin: "auto", marginBottom: 15 }}
                        variant="warning"
                        disabled={loading}
                        type="submit"
                      >
                        Update
                      </Button>
                    </Form>
                  ) : (
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
                            src={user.profile_picture}
                            alt="This is my kingdom cum"
                            onClick={handleClickOnProfilePicture}
                            style={{ height: 100, width: 150 }}
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
                          onChange={(e) => setPassword(e.target.value)} // fixed typo in function name
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
                      <Button
                        style={{ width: 100, margin: "auto", marginBottom: 15 }}
                        variant="warning"
                        disabled={loading}
                        type="submit"
                      >
                        Update
                      </Button>
                    </Form>
                  )}

                  <Button variant="warning" onClick={handleCancelButton}>
                    Cancel
                  </Button>
                </>
              </div>
            ) : (
              <div>
                <Row>
                  <Row xs={7}>
                    <Col>
                      <Card
                        className=" my-2 p-3 rounded"
                        style={{
                          backgroundColor: "#565656",
                          width: 286,
                          height: 490,
                        }}
                      >
                        <Row>
                          <Col>
                            <p>
                              <img
                                src={user.profile_picture}
                                style={{ width: 250 }}
                                alt="Profile"
                              />
                            </p>
                            <Row>
                              <Col>
                                <pre
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "Calibri",
                                    marginBottom: 3,
                                  }}
                                >
                                  <strong>Username:</strong> {user.username}
                                </pre>
                              </Col>
                              <Col>
                                <pre
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "Calibri",
                                    marginBottom: 3,
                                  }}
                                >
                                  <strong>Email:</strong> {user.email}
                                </pre>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <pre
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "Calibri",
                                    marginBottom: 3,
                                  }}
                                >
                                  <strong>First Name:</strong> {user.first_name}
                                </pre>
                              </Col>
                              <Col>
                                <pre
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "Calibri",
                                    marginBottom: 3,
                                  }}
                                >
                                  <strong>Last Name:</strong> {user.last_name}
                                </pre>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <pre
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "Calibri",
                                    marginBottom: 8,
                                  }}
                                >
                                  <strong>Contact:</strong> {user.contact}
                                </pre>
                              </Col>
                            </Row>
                            <Row>
                              <Button
                                style={{ width: 100, margin: "auto" }}
                                variant="warning"
                                onClick={handleEditButton}
                              >
                                <FontAwesomeIcon icon={faPenToSquare} /> Edit
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>

                    {userInfo && userInfo.tutor ? (
                      <Col xs={9}>
                        <Card
                          className=" my-2 p-3 rounded"
                          style={{
                            backgroundColor: "#565656",
                            width: 963,
                            height: 490,
                          }}
                        >
                          <Row>
                            <Col>
                              <p
                                style={{
                                  fontSize: 18,
                                  fontFamily: "Calibri",
                                  marginBottom: 6,
                                }}
                              >
                                <strong>Bio:</strong>
                              </p>
                            </Col>
                            <Col style={{ marginRight: 120 }}>
                              <p style={{ width: 850, marginLeft: 50 }}>
                                {" "}
                                {user.bio}
                              </p>
                            </Col>
                          </Row>
                            <Row>
                              <Col>
                                <h4>Subjects:</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                  {subjectList}
                                </div>
                              </Col>
                            </Row>
                          <Row>
                            <Col>
                              <pre
                                style={{
                                  fontSize: 18,
                                  fontFamily: "Calibri",
                                  marginBottom: 6,
                                }}
                              >
                                <strong>Meeting Link:</strong>{" "}
                                {user.meeting_link}
                              </pre>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p
                                style={{
                                  fontSize: 18,
                                  fontFamily: "Calibri",
                                  marginBottom: 6,
                                }}
                              >
                              </p>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ) : (
                      <Card
                        className=" my-2 p-3 rounded"
                        style={{
                          backgroundColor: "#565656",
                          width: 963,
                          height: 448,
                          marginRight: 10,
                        }}
                      >
                        <h5>TUTORING History</h5>
                        <br />

                        <table
                          style={{ border: "1px solid black" }}
                          className="table-sm"
                        >
                          <thead>
                            <tr style={{ border: "1px solid black" }}>
                              <th style={{ border: "1px solid black" }}>
                                Column 1
                              </th>
                              <th style={{ border: "1px solid black" }}>
                                Column 2
                              </th>
                              <th style={{ border: "1px solid black" }}>
                                Column 3
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid black" }}>
                                Row 1, Column 1
                              </td>
                              <td style={{ border: "1px solid black" }}>
                                Row 1, Column 2
                              </td>
                              <td style={{ border: "1px solid black" }}>
                                Row 1, Column 3
                              </td>
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
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProfileScreen;
