import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { addContact } from "../../../features/redux/actions/contactActions";
import Widgets from "./Widgets";
import MapWidget from "./MapWidget";
import { useNavigate } from "react-router-dom";
import MessageAlert from "../../elements/MessageAlert";

function ContactScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contactUsFormState = useSelector((state) => state.contactUsFormState);
  const { loading, error, data } = contactUsFormState;

  const [formData, setFormData] = useState({
    concern: "",
    comment: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (data) {
      navigate("/contact-success");
    }
  }, [loading, error, data, navigate]);

  useEffect(() => {
    setIsFormValid(
      (formData.concern !== "" && formData.comment.length >= 100) && !loading
    );
  }, [formData.concern, formData.comment, loading])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      dispatch(addContact(formData));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="contact-heading my-5">
        <h2>Contact Us</h2>
      </div>

      <Widgets />

      <Container>
        <Form onSubmit={handleSubmit}>
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
              required
            />
            {formData.comment && formData.comment.split(" ").length < 100 && (
              <div className="invalid-feedback">
                Please enter at least 100 words.
              </div>
            )}
          </Form.Group>
          <Button
            type="submit"
            disabled={!isFormValid}
            className="btn btn-warning"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                &nbsp;Submitting...
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
          {error && (
            <MessageAlert variant="danger">{error}</MessageAlert>
          )}
        </Form>
      </Container>

      <MapWidget />
    </div>
  );
}

export default ContactScreen;
