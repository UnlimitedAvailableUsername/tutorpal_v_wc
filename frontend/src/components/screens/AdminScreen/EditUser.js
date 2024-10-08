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
  Card
} from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listUserDetails,
  editUser,
} from "../../../features/redux/actions/adminActions";
import { listSubjects } from "../../../features/redux/actions/subjectActions";
import { subjectListReducer } from "../../../features/redux/reducers/subjectReducer";
import backgroundImage from '../../../assets/components/screens/ScheduleScreen/secret.png'
import "../../../assets/components/screens/AdminScreen/AdminScreen.css"

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

  if (userId === userInfo.Id) {
    window.alert("You can't deactivate your own account.");
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
    userData.append("numReviews", numReviews);

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
      if (profile_picture.size > 2 * 1024 * 1024) {
        alert("File size exceeded 2MB limit.");
        return;
      }
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



  const renderActiveForm1 = () => {
    if (user?.tutor  && user?.active) {
      return (
        <Form onSubmit={handleDeactivateTutor}>
          <br />
          <Form.Group className="mb-3">
            <Button
              style={{ width: 250, marginLeft: 70 }}
              type="submit"
              variant="danger"
              className="me-3 "
            >
              Deactivate
            </Button>
            <Form.Check
              type="checkbox"
              id="deactivate"
              name="deactivate"
              className="form-check-input"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              label="Deactivate"
              style={{ display: "none" }}
            />
          </Form.Group>
        </Form>
      );
    } else if (user?.tutor ) {
      return (
        <Form onSubmit={handleActivateTutor}>
          <Button
            style={{ width: 250, marginLeft: 70 }}
            type="submit"
            variant="warning"
            className="me-3 mt-4"
          >
            Activate
          </Button>
        </Form>
      );
    } else {
      return null;
    }
  };



  const renderActiveForm = () => {
    if (user?.student  && user?.active) {
      return (
        <Form onSubmit={handleDeactivateTutor}>
          <br />
          <Form.Group className="mb-3">
            <Button
              style={{ width: 250, marginLeft: 300 }}
              type="submit"
              variant="danger"
              className="me-3 "
            >
              Deactivate
            </Button>
            <Form.Check
              type="checkbox"
              id="deactivate"
              name="deactivate"
              className="form-check-input"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              label="Deactivate"
              style={{ display: "none" }}
            />
          </Form.Group>
        </Form>
      );
    } else if (user?.student ) {
      return (
        <Form onSubmit={handleActivateTutor}>
          <Button
            style={{ width: 250, marginLeft: 70 }}
            type="submit"
            variant="warning"
            className="me-3 mt-4"
          >
            Activate
          </Button>
        </Form>
      );
    } else {
      return null;
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

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '220vh',
    backgroundAttachment: 'fixed',
  }; 

  return (
    <>
      {user && (
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
        
        <Container>    <br/><br/><br/>
          <div className="d-flex justify-content-between align-items-center mb-5 ">
        
            <Button
              as={Link}
              to="/user-list"
              variant="warning"
              className="btn-outline py-3"
            >
              Back To User List
            </Button>

            
          </div>
          {user?.tutor && (
              <>
          <Card style={{ width: 1300, margin: 'auto', }} className='card px-5   p-5 mb-1 rounded'>
            
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

              <div className="d-flex  ">
                    <Button
                      variant="success"
                      type="submit"
                      onClick={handleSubmit}
                      className="mr-3 me-2 mt-3"
                      style={{width:250, marginLeft:70}}                    >
                      Save
                    </Button>
                    
                   
                    
                  </div>
                  {renderActiveForm1()}
            </Col>
         
                <Col xs={12} md={8}>
                  <ListGroup variant="flush">
                    <Form.Group controlId="reviews">
                      <Form.Label>Reviews</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Number of Reviews"
                        value={numReviews}
                        onChange={(e) => setReviews(e.target.value)}
                      />
                    </Form.Group>

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
                  </ListGroup>
                  <h1 className="text-center">ID's</h1>
                  <div className="d-flex flex-column align-items-center justify-content-center mb-4">
                    <Image
                      src={user.photo_education_background}
                      fluid
                      className="mb-2"
                      style={{ maxWidth: "300px" }}
                    />
                    <Image
                      src={user.photo_id}
                      fluid
                      className="mb-2"
                      style={{ maxWidth: "300px" }}
                    />
                  </div>

                 
                </Col>
             
          </Row>
          </Card>
          </>
          )}



{user?.student && (
              <>
          <Card style={{ width: 1000, margin: 'auto', }} className='card px-6   p-5 mb-1 rounded'>
            
          <Row>
          

              <div className="d-flex align-items-center justify-content-center mb-4 w-100">
                <Image style={{width: 300}} src={user.profile_picture} alt={user.first_name} fluid />
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

              <div className="d-flex  ">
                    <Button
                      variant="success"
                      type="submit"
                      onClick={handleSubmit}
                      className="mr-3 me-2 mt-3"
                      style={{width:250, marginLeft:300}}                    >
                      Save
                    </Button>
                    
                   
                    
                  </div>
                  {renderActiveForm()}

         
          </Row>
          </Card>
          </>
          )}
        </Container>
        </div>
      )}
    </>
  );
}

export default EditUser;
