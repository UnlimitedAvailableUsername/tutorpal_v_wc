import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { listTutors } from "../../../features/redux/actions/tutorActions";
import { Row, Col, Container } from "react-bootstrap";
import Tutor from "../../elements/TutorOnCard";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../assets/components/screens/TutorListScreen/tutorlist.css";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";

function TutorListScreen() {
  const [search, setSearch] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");

  const tutorList = useSelector((state) => state.tutorList);
  const { users, loading, error } = tutorList;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listTutors());
  }, [dispatch]);
  
  // function para ma sort by review or price
  const sortUsersByPrice = (users) => {
    if (sortOrder === "asc") {
      return users.sort((a, b) => a.price_rate_hour - b.price_rate_hour);
    } else if (sortOrder === "desc") {
      return users.sort((a, b) => b.price_rate_hour - a.price_rate_hour);
    } else if (sortOrder === "revAsc") {
      return users.sort((a, b) => a.numReviews - b.numReviews);
    } else if (sortOrder === "revdesc") {
      return users.sort((a, b) => b.numReviews - a.numReviews);
    }
  };
  
  const handleSortOrderChange = (eventKey) => {
    setSortOrder(eventKey);
  };
  
  //FUNCTION PARA MAG-HIGHLIGHT NG WHITE YUNG TERMS NA SINESEARCH
  const highlightSearch = (text) => {
    if (search.trim() === "") {
      return text;
    }
    const regex = new RegExp(search, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === search.toLowerCase()
                ? { fontWeight: "bold", color: "white" }
                : null
            }
          >
            {part}
            {i < parts.length - 1 && (
              <strong style={{ fontWeight: "bold", color: "white" }}>
                {search}
              </strong>
            )}
          </span>
        ))}
      </span>
    );
  };

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
        {loading ? (
          <LoadingIconBig />
        ) : error ? (
          <MessageAlert variant="danger">{error}</MessageAlert>
        ) : (
          <>
            <Dropdown onSelect={handleSortOrderChange}>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{ backgroundColor: "#037d50 ", borderColor: "#037d50" }}
              >
                Sort by price ({sortOrder === "asc" ? "low to high" : "high to low"}
                )
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="asc">Price: Low to High</Dropdown.Item>
                <Dropdown.Item eventKey="desc">Price: High to Low</Dropdown.Item>
                <Dropdown.Item eventKey="revdesc"> Review: High to Low </Dropdown.Item>
                <Dropdown.Item eventKey="revAsc">Review: Low to High</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <br></br>

            <Row>
              {users &&
                sortUsersByPrice(users)
                  .filter(
                    (user) =>
                      user.tutor &&
                      (!search ||
                        user.last_name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        user.last_name
                          .toUpperCase()
                          .includes(search.toUpperCase()) ||
                        // user.subject.toUpperCase().includes(search.toUpperCase()) ||
                        // user.subject.toLowerCase().includes(search.toLowerCase()) ||
                        user.bio.toLowerCase().includes(search.toLowerCase()) ||
                        user.bio.toUpperCase().includes(search.toUpperCase()) ||
                        user.first_name
                          .toUpperCase()
                          .includes(search.toUpperCase()) ||
                        user.first_name
                          .toLowerCase()
                          .includes(search.toLowerCase()))
                  )
                  .map((user) => {
                    return {
                      ...user,
                      highlightedBio:
                        typeof user.bio === "string"
                          ? highlightSearch(user.bio.slice(0, 200))
                          : "",
                    };
                  })
                  .map((user) => (
                    <Col key={user.id} sm={12} md={6} lg={4} xl={12}>
                      <Tutor
                        user={{
                          ...user,
                          first_name: highlightSearch(user.first_name),
                          last_name: highlightSearch(user.last_name),
                          bio: user.highlightedBio,
                        }}
                        />
                    </Col>
                  ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default TutorListScreen;
