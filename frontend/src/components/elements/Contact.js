import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Contact({ contact }) {
  const [showComment, setShowComment] = useState(false);
  const commentText = showComment ? contact.comment : contact.comment.substring(0, 30) + "...";

  const toggleComment = () => {
    setShowComment(!showComment);
  };

  return (
    <div>
      <Row>
        <Card style={{ backgroundColor: "#404040" }} className=" my-1 p-3 rounded">
          <Row>
            <Col md={3}></Col>
            <Col>
              <Card.Body>
                <Link to={`concern/${contact.id}`}>
                  <Card.Title>
                    <strong>
                      {contact.first_name} {contact.last_name}
                    </strong>
                  </Card.Title>
                </Link>
                <Card.Text as="div">
                  <div></div>
                  <div>
                    {" "}
                    Email/Username: <br></br>{contact.email} <br></br>{" "}
                  </div>
                </Card.Text>

                <Card.Text style={{ color: "#D3D3D3" }}>
                  Subject: {contact.concern}
                </Card.Text>

                <Card.Text as="h8">
                  {commentText}
                  {contact.comment.length > 30 && (
                    <button className="btn btn-link p-0 m-0" onClick={toggleComment}>
                      {showComment ? "Read Less" : "Read More"}
                    </button>
                  )}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Row>
    </div>
    
  );
}

export default Contact;