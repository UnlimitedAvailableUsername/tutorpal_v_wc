import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../elements/HeaderHomePage";
import { listContactDetails } from "../../../features/redux/actions/contactActions";

function ContactDetail() {
  const { contactId } = useParams();

  const dispatch = useDispatch();
  const contactDetails = useSelector((state) => state.contactDetails);
  const { contact } = contactDetails || {};

  useEffect(() => {
    dispatch(listContactDetails(contactId));
  }, [dispatch, contactId]);

  return (
    <div>
      <Header></Header>
      <Container>
        <Link to="/concern-list" className="btn btn-warning btn-outline-dark py-3 my-5" >Back to Concern List</Link>
        <Row>
          <Col md={{ span: 3 }} style={{ position: "relative" }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <h5> Name: <br></br>
                {contact && contact.name}
                </h5>
              </ListGroup.Item>

            </ListGroup>
          </Col>

          <Col md={{ span: 9 }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}> Concern:</Col>
                  <Col style={{ maxWidth: "80vw", overflowWrap: "break-word" }}>
                  {contact && contact.concern}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}> Details:</Col>
                  <Col style={{ maxWidth: "80vw", overflowWrap: "break-word" }}>
                  {contact.comment}
                  </Col>
                </Row>
              </ListGroup.Item>

            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactDetail;