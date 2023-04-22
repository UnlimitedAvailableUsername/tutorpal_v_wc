import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Container,
  Table,
  Form,
} from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listUserDetails,
  editUser,
} from "../../../features/redux/actions/adminActions";
import { listSubjects } from "../../../features/redux/actions/subjectActions";
import { subjectListReducer } from "../../../features/redux/reducers/subjectReducer";

function EditUser() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [price_rate_hour, setPrice] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [contact, setContact] = useState("");
  const [bio, setBio] = useState("");
  const [numReviews, setReviews] = useState("");
  const [meeting_link, setmeetingLink] = useState("");

  const [profile_picture, setProfile] = useState("");

  const userLoginState = useSelector((state) => state.userState);
  const { userInfo } = userLoginState;

  const adminuserdetails = useSelector((state) => state.adminuserdetails);
  const { error, loading, user } = adminuserdetails;

  const subjectList = useSelector((state) => state.subjectList);
  const { subjects } = subjectList;

  const [selectedSubjects, setSelectedSubjects] = useState(
    userInfo.subjects.map((subject) => subject.id)
  );

  useEffect(() => {
    dispatch(listUserDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(listSubjects());
  }, [dispatch]);

 
  useEffect(() => {
    setActive(user?.active);
    setFirstName(user?.first_name);
    setProfile(user?.profile_picture);
    setLastName(user?.last_name);
    setEmail(user?.email);
    setContact(user?.contact);
    setPassword(user?.password || ""); // pass empty string if password is undefined
    setPrice(user?.price_rate_hour);
    setBio(user?.bio);
    setReviews(user?.numReviews);
    setUsername(user?.username);
    setmeetingLink(user?.meeting_link);
    setSelectedSubjects(user?.subjects?.map((subject) => subject.id) || []);
  }, [user]);
  

  const handleActivateTutor = async (e) => {
    e.preventDefault();

    if (!userId) {
      return;
    }

    const userData = {
      active: true,
    };

    try {
      await dispatch(editUser(userId, userData, userInfo));
      window.location.reload(); // Reload page after successful submission
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  const handleDeactivateTutor = async (e) => {
    e.preventDefault();

    if (!userId) {
      return;
    }

    const userData = {
      active: false,
    };

    try {
      await dispatch(editUser(userId, userData, userInfo));
      window.location.reload();
    } catch (error) {
      console.log(error);
      // handle error
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("username", username);
    userData.append("first_name", firstName);
    userData.append("last_name", lastName);
    userData.append("email", email);

    // Append password field only if it has a value
    if (password) {
      userData.append("password", password);
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      setPasswordError("");
    }

    userData.append("contact", contact);
    userData.append("bio", bio);
    userData.append("price_rate_hour", price_rate_hour);
    userData.append("meeting_link", meeting_link);

    selectedSubjects.forEach((subjectId) => {
      userData.append("subjects", subjectId);
    });
    
    

    if (typeof profile_picture === "object") {
      userData.append("profile_picture", profile_picture);
    }

    try {
      await dispatch(editUser(userId, userData, userInfo));
      window.location.reload(); // Reload the page
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  const renderActiveForm = () => {
    if (user?.active) {
      return (
        <Form onSubmit={handleDeactivateTutor}>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="deactivate"
              name="deactivate"
              className="form-check-input"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              label="Deactivate"
            />
          </Form.Group>
          <Button type="submit" variant="danger" className="me-3">
            Deactivate
          </Button>
        </Form>
      );
    } else {
      return (
        <Form onSubmit={handleActivateTutor}>
          <Button type="submit" variant="success" className="me-3">
            Activate
          </Button>
        </Form>
      );
    }
  };
  
  const handleSelectedSubjectsChange = (event) => {
    const subjectId = parseInt(event.target.value);
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedSubjects((prevState) => [...prevState, subjectId]);
    } else {
      setSelectedSubjects((prevState) =>
        prevState.filter((id) => id !== subjectId)
      );
    }
    console.log(selectedSubjects);
  };
  


  return (
    <div>
      {user && (
        <Container>
          <Button
            as={Link}
            to="/tutors-admit"
            variant="warning"
            className="btn-outline-dark py-3 my-5"
          >
            Back To Admit List
          </Button>

          <Row>
            <Col xs={12} md={4}>
              <div className="d-flex align-items-center justify-content-center mb-4">
                <Image src={user.profile_picture} alt={user.first_name} fluid />
              </div>
          
              <Form.Group controlId="image">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setProfile(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={!!passwordError}
                />
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="number">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contact number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="reviews">
                <Form.Label>Reviews</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Number of Reviews"
                  value={numReviews}
                  onChange={(e) => setReviews(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={8}>
              <ListGroup variant="flush">
                <Form.Group controlId="bio">
                  <Form.Group controlId="price">
                    <Form.Label>Hourly Rate</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Hourly Rate"
                      value={price_rate_hour}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Tell us about yourself"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="meeting">
                  <Form.Label>Zoom Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter zoom link"
                    value={meeting_link}
                    onChange={(e) => setmeetingLink(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="subjects">
                  <Form.Label>Select your subjects</Form.Label>

                  {subjects &&
                    subjects.map((subject) => (
                      <div key={subject.id}>
                        <Form.Check
                          type="checkbox"
                          id={`subject-${subject.id}`}
                          label={subject.subject_title}
                          checked={selectedSubjects.includes(subject.id)}
                          value={subject.id}
                          onChange={handleSelectedSubjectsChange}
                        />
                      </div>
                    ))}
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Save
                </Button>
                <ListGroup variant="flush">
                  {" "}
                  <br></br>
                  {renderActiveForm()}
                </ListGroup>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default EditUser;
