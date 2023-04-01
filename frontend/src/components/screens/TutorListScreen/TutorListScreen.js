import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { listTutors } from "../../../features/redux/actions/tutorActions";
import { Row, Col, Container } from "react-bootstrap";
import Tutor from "../../elements/TutorOnCard";
import "../../../assets/components/screens/TutorListScreen/tutorlist.css";

function TutorListScreen() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const tutorList = useSelector((state) => state.tutorList);
  const { users } = tutorList;

  useEffect(() => {
    dispatch(listTutors());
  }, [dispatch]);
  return (
    <div>
      <div className="tutor-bg"></div>
      <div className="tutor-bg-text-overlay text-center">
        <h1 className="text-uppercase tutor-text-h1">our tutors</h1>
        <h4>
          Click on each tutor's profile to learn more about the tutor's
          education background and experience.
        </h4>
      </div>
      <Container>
        <Form>
          <Container className="my-5">
            <Form.Control
              className="shadow"
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search for Tutors"
              aria-label="Search"
            />
          </Container>
        </Form>

        <Row>
  {users
    .filter((user) => user.tutor && (
      !search ||
      user.last_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toUpperCase().includes(search.toUpperCase()) ||
      user.subject.toUpperCase().includes(search.toUpperCase()) ||
      user.subject.toLowerCase().includes(search.toLowerCase()) ||
      user.bio.toLowerCase().includes(search.toLowerCase()) ||
      user.bio.toUpperCase().includes(search.toUpperCase()) ||
      user.first_name.toUpperCase().includes(search.toUpperCase()) ||
      user.first_name.toLowerCase().includes(search.toLowerCase())
    ))
    .map((user) => (
      <Col key={user.id} sm={12} md={6} lg={4} xl={12}>
        <Tutor user={user} />
      </Col>
    ))}
</Row>
      </Container>
    </div>
  );
}

export default TutorListScreen;
