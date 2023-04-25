import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRegisterFormData,
  validateUsernameEmailRegister,
} from "../../../features/redux/actions/authUserActions";
import { useNavigate } from "react-router";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import MessageAlert from "../../elements/MessageAlert";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import { USER_REGISTER_UNIQUE_VALIDATE_FAIL } from "../../../features/redux/constants/authUserConstants";
import { Link } from "react-router-dom";
import "../../../assets/components/screens/RegisterScreen/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "../../../assets/components/screens/RegisterScreen/ama.png";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegisterState = useSelector((state) => state.userRegisterState);
  const { loading, error, valid, registerFormData } = userRegisterState;

  const [formData, setFormData] = useState({
    username: registerFormData?.username || "",
    email: registerFormData?.email || "",
    password: registerFormData?.password || "",
    tutor: registerFormData?.tutor || false,
    student: registerFormData?.student || false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleAgreeToTerms = () => {
    setAgreedToTerms((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "tutor" || name === "student") {
      setFormData((prevState) => ({
        ...prevState,
        tutor: name === "tutor" ? checked : false,
        student: name === "student" ? checked : false,
      }));
    } else if (name === "password") {
      setFormData((prevState) => ({
        ...prevState,
        password: value,
      }));
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const isFormValid = () => {
      return (
        formData.username &&
        formData.email &&
        formData.password &&
        (formData.tutor || formData.student) &&
        formData.password === confirmPassword &&
        confirmPassword &&
        agreedToTerms
      );
    };
    setFormValid(isFormValid());
  }, [formData, confirmPassword, agreedToTerms]);

  useEffect(() => {
    if (valid) {
      if (formData.tutor) {
        navigate("/register/tutor");
      } else {
        navigate("/register/student");
      }
    }
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      dispatch({
        type: USER_REGISTER_UNIQUE_VALIDATE_FAIL,
        payload: "Password do not match!",
      });
    } else {
      dispatch(setRegisterFormData(formData));
      dispatch(validateUsernameEmailRegister(formData));
    }
  };

  const linkToTermsAndConditions = (
    <>
      &nbsp;&nbsp;I agree to the&nbsp;
      <Link to="/terms-and-conditions">Terms and Conditions</Link> of TutorPal
    </>
  );

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "130vh",
    backgroundAttachment: "fixed",
  };

  return (
    <div style={backgroundStyles}>
        <Row>
          <Col className="h-200 d-flex align-items-center" style={{paddingLeft:"32em"}} md={5}>
            <Row>
              <p>
                <FontAwesomeIcon icon={faBullseye} size="2x" /> Choose from many
                highly qualified and trusted Tutors
              </p>
              <p>
                <FontAwesomeIcon icon={faBullseye} size="2x" />
                24/7 access to the best tutors
              </p>
              <p>
                <FontAwesomeIcon icon={faBullseye} size="2x" />
                Expert help in 3 pataas subjects
              </p>
              <p>
                <FontAwesomeIcon icon={faBullseye} size="2x" />
                All tutors qualified and background-checked
              </p>
            </Row>
          </Col>

          {error && <MessageAlert variant="danger">{error}</MessageAlert>}
          {loading && <LoadingIconBig />}
          <Col>
            <Row className="align-items-center">
              <Col xl={9} xs={10}>
                <Card
                  style={{ width: 900 }}
                  className="px-5 my-5 shadow p-3 mb-5 rounded"
                >
                  <Container>
                    <Card.Title className="py-5">
                      <h2 className="text-uppercase">
                        <strong>Register</strong>
                      </h2>
                    </Card.Title>
                    <Form onSubmit={handleNext}>
                      <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          onChange={handleInputChange}
                          value={formData.username}
                        />
                      </Form.Group>

                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          onChange={handleInputChange}
                          value={formData.email}
                        />
                      </Form.Group>

                      <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          onChange={handleInputChange}
                          value={formData.password}
                        />
                      </Form.Group>

                      <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          onChange={handleInputChange}
                          value={confirmPassword}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label className="mt-4">
                          <h4>What type of user are you registering as?</h4>
                        </Form.Label>
                        <Col>
                          <Form.Check
                            custom
                            type="radio"
                            label="&nbsp;&nbsp;Tutor"
                            name="tutor"
                            checked={formData.tutor}
                            onChange={handleInputChange}
                          />
                          <Form.Check
                            custom
                            type="radio"
                            label="&nbsp;&nbsp;Student"
                            name="student"
                            checked={formData.student}
                            onChange={handleInputChange}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="my-4" controlId="agreedToTerms">
                        <Form.Check
                          type="checkbox"
                          label={
                            <>
                              I agree to the&nbsp;
                              <Link to="/terms-and-conditions">
                                Terms and Conditions
                              </Link>
                            </>
                          }
                          name="agreedToTerms"
                          checked={agreedToTerms}
                          onChange={handleAgreeToTerms}
                          required
                        />
                      </Form.Group>

                      <Button variant="warning" type="submit" disabled={!formValid}>
                        Next
                      </Button>
                    </Form>
                  </Container>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
    </div>
  );
};

export default RegisterScreen;
