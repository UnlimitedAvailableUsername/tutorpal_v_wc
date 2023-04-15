import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listContactDetails,
  updateContact,
} from "../../../features/redux/actions/contactActions";

function ContactDetail() {
  const { contactId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contactDetails = useSelector((state) => state.contactDetails);
  const { contact } = contactDetails || {};

  const [done, setDone] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    dispatch(listContactDetails(contactId));
  }, [dispatch, contactId]);

  useEffect(() => {
    if (contact && contact.done) {
      setShowForm(false);
    }
  }, [contact]);

  const handleEditContact = async (e) => {
    e.preventDefault();

    if (!contactId) {
      return;
    }

    const contactData = {
      done: true,
    };

    try {
      await dispatch(updateContact(contactId, contactData));
      setShowForm(false);
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  return (
    <div>
      <Container>
        <Link
          to="/concern-list"
          className="btn btn-warning btn-outline-dark py-3 my-5"
        >
          Back to Concern List
        </Link>
        <Row>
          <Col md={{ span: 3 }} style={{ position: "relative" }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <h5>
                  {" "}
                  Name: <br></br>
                  {contact && contact.name}
                </h5>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={{ span: 9 }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}> Issue:</Col>
                  <Col style={{ maxWidth: "80vw", overflowWrap: "break-word" }}>
                    {contact && contact.concern}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}> Details:</Col>
                  <Col style={{ maxWidth: "80vw", overflowWrap: "break-word" }}>
                    {contact && contact.comment}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}> Date:</Col>
                  <Col style={{ maxWidth: "80vw", overflowWrap: "break-word" }}>
                    {contact && contact.created_date}
                  </Col>
                </Row>
              </ListGroup.Item>

              {showForm && (
                <ListGroup variant="flush">
                  <Form onSubmit={handleEditContact}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id="done"
                        name="done"
                        className="form-check-input"
                        label="Done"
                        checked={done}
                        onChange={(e) => setDone(e.target.checked)}
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      className="btn btn-warning"
                      disabled={!done}
                    >
                      Mark as Done
                    </Button>
                  </Form>
                </ListGroup>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactDetail;
