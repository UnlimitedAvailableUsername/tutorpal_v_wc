import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSubjectDetails, updateSubject } from "../../../features/redux/actions/subjectActions";

function EditSubject() {
  const { subjectId } = useParams();
  const [subject_title, setSubject_title] = useState("");
  const dispatch = useDispatch();
  const subjectDetails = useSelector((state) => state.subjectDetails);
  const { subject } = subjectDetails || {};
  

  useEffect(() => {
    dispatch(listSubjectDetails(subjectId));
  }, [dispatch, subjectId]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("subject_title", subject_title);

    dispatch(updateSubject(parseInt(subjectId), { subject_title }));
    window.location.reload();
  };

  return (
    <div>
      <Container>
        <Link to="/subject-admin" className="btn btn-warning btn-outline-dark py-3 my-5">
          Subjects List
        </Link>
        <Row>
          <Col md={{ span: 3 }} style={{ position: "relative" }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <h6>
                  {" "}
                  Title: <br></br>
                  {subject && subject.subject_title} 
                </h6>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={{ span: 9 }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#404040" }}>
                <Row>
                  <Col md={{ span: 2 }}>Update:</Col>
                  <Col style={{ maxWidth: "90vw", overflowWrap: "break-word" }}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={subject_title}
                      onChange={(e) => setSubject_title(e.target.value)}
                    />
                    <button className="btn btn-warning btn-sm" onClick={handleUpdate}>
                      Update
                    </button>{" "}
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

export default EditSubject;
