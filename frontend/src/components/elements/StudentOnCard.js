import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Student({ student }) {
  const urlPath = `${student.id}`;

  return (
    <Row>
      <Card style={{ backgroundColor: "#404040" }} className="my-2 rounded">
        <Link to={urlPath} style={{ color: "#fafafa", textDecoration: "none" }}>
          <Row>
            <Col>
              <Card.Img
                style={{ width: 120, height: 120, objectFit: "cover" }}
                src={`${student.profile_picture}`}
              />
            </Col>
            <Col md={10}>
              <Card.Body>
                <Card.Title>
                  <h3>
                    <strong>
                      {student.first_name && student.last_name ? (
                        <div>
                          {student.first_name}&nbsp;{student.last_name}
                        </div>
                      ) : (
                        <div className="text-muted">Unknown Name</div>
                      )}
                    </strong>
                  </h3>
                </Card.Title>
                <Card.Text>
                  <div>
                    Total number of orders:&nbsp;&nbsp;{student.orders.length}
                  </div>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Link>
      </Card>
    </Row>
  );
}

export default Student;
