import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { USER_REGISTER_UNIQUE_VALIDATE_RESET } from "../../../features/redux/constants/authUserConstants";
import { Link } from "react-router-dom";
import MessageAlert from "../../elements/MessageAlert";
import { registerUser } from "../../../features/redux/actions/authUserActions";

const RegisterForStudentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegisterState = useSelector((state) => state.userRegisterState);
  const {
    loading: registerLoading,
    error: registerError,
    success,
    valid,
    registerFormData,
  } = userRegisterState;

  useEffect(() => {
    if (valid && registerFormData) {
      dispatch({ type: USER_REGISTER_UNIQUE_VALIDATE_RESET });
    } else if (!registerFormData) {
      navigate("/register");
    } else if (success) {
      navigate("/register/result");
    }
  }, [valid, success, registerFormData, dispatch, navigate]);

  const [formData, setFormData] = useState({
    ...registerFormData,
    first_name: "",
    last_name: "",
    contact: "",
    profile_picture: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_picture" && files && files[0]) {
      const fileSize = files[0].size / 1024 / 1024; // in MB
      if (fileSize > 2) {
        alert("Profile picture size should be less than 2MB");
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    console.log(formData);
  };

  const isFormIncomplete = !formData.first_name || !formData.last_name || !formData.contact;

  return (
    <>
      {registerFormData && (
        <Row className="justify-content-center align-items-center">
          <Col xl={8} xs={10}>
            <Button
              as={Link}
              to="/register"
              variant="warning"
              className="btn-outline-dark py-2 mt-5"
            >
              &lt; Go back
            </Button>
            <Card className="px-0 my-5 shadow">
              <Card.Title className="mx-4 my-4">
                <h2 className="text-center">
                  <strong>Student Registration</strong>
                </h2>
              </Card.Title>
              <Card.Body>
                <Form onSubmit={handleRegister}>
                  <Row>
                    <Form.Group controlId="first_name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="first_name"
                        onChange={handleInputChange}
                        value={formData.first_name}
                      />
                    </Form.Group>

                    <Form.Group controlId="last_name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="last_name"
                        onChange={handleInputChange}
                        value={formData.last_name
}
/>
</Form.Group>
</Row>

              <Row>
                <Form.Group controlId="contact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    onChange={handleInputChange}
                    value={formData.contact}
                  />
                </Form.Group>

                <Form.Group controlId="profile_picture">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="profile_picture"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>

              {registerLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isFormIncomplete}
                >
                  Register
                </Button>
              )}

              {registerError && (
                <MessageAlert variant="danger">{registerError}</MessageAlert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )}
</>
);
};

export default RegisterForStudentScreen;







