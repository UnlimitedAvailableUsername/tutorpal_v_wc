import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import { addContact } from "../../../features/redux/actions/contactActions";
import Widgets from "./Widgets";
import MapWidget from "./MapWidget";
import { useNavigate } from "react-router-dom";


function ContactScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contactUsFormState = useSelector((state) => state.contactUsFormState);
  const { loading, error } = contactUsFormState;

  const [formData, setFormData] = useState({
    concern: "",
    comment: "",
  });

  useEffect(() => {
    if (loading === false && error === null) {
      setFormData({ concern: "", comment: "" });
    }
  }, [loading, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(formData)).then((response) => {
      navigate("/contact-success");
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log("formData after handleChange: ", formData);
  };

  return (
    <div>
      <div className="contact-heading">
        <h2>Contact Us</h2>
      </div>

      <Widgets />

      <Container>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>What is your concern about?</Form.Label>
            <Form.Control
              type="text"
              id="concern"
              name="concern"
              className="form-control"
              value={formData.concern}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Please give us more details</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              id="comment"
              name="comment"
              className="text"
              value={formData.comment}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            className="btn btn-warning"
            onClick={(e) => {
              if (formData.comment.length < 100) {
                alert(
                  "Please enter a comment with at least" + " 100 characters"
                );
              } else {
                handleSubmit(e);
              }
            }}
          >
            Submit
          </Button>
        </Form>
      </Container>

      <MapWidget />
    </div>
  );
}

export default ContactScreen;
