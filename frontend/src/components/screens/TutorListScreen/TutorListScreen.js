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
          <Row>
            <Col>
              <Container>
                <Form.Control
                  className="shadow"
                  style={{ width: 1000, marginLeft: 140 }}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search for Tutors"
                  aria-label="Search"
                />
              </Container>
            </Col>
          </Row>
        </Form>

        <Row>
          {users
            .filter((user) => {
              return search.toLowerCase() === ""
                ? user
                : user.first_name.toLowerCase().includes(search) ||
                    user.last_name.toLowerCase().includes(search) ||
                    user.bio.toLowerCase().includes(search) ||
                    user.subject.toLowerCase().includes(search);
            })
            .map((user) => (
              <Col key={user.id} sm={12} md={6} lg={4} xl={3}>
                <Tutor user={user} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default TutorListScreen;
