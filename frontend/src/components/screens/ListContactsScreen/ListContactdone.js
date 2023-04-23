import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listContacts } from "../../../features/redux/actions/contactActions";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";


function ListContact() {
  const [search, setSearch] = useState("");
  const [expandedComments, setExpandedComments] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");

  const contactList = useSelector((state) => state.contactList);
  const { contacts } = contactList || {};

  const userLogin = useSelector((state) => state.userState);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.staff) {
      dispatch(listContacts());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  const handleReadMoreClick = (e, commentId) => {
    e.preventDefault();
    if (!expandedComments.includes(commentId)) {
      setExpandedComments([...expandedComments, commentId]);
    } else {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    }
  };

  const sortContactByDate = (contacts) => {
    if (sortOrder === "asc") {
      return contacts.sort(
        (a, b) => new Date(a.created_date) - new Date(b.created_date)
      );
    } else if (sortOrder === "desc") {
      return contacts.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );
    }
  };

  const handleSortOrderChange = (eventKey) => {
    setSortOrder(eventKey);
  };
  return (
    <Container>
      <div className="tutor-text text-center">
        <p style={{ fontSize: 50 }}>Concerns</p>
      </div>

      <Form>
        <Row>
          <Col>
            <Form.Control
              className="shadow"
              type="search"
              placeholder="Search for Tutors"
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search"
            />
          </Col>
        </Row>
      </Form>

      <p>
        Total concerns:{" "}
        {contacts && contacts.filter((contact) => contact.done).length}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Dropdown onSelect={handleSortOrderChange}>
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{ backgroundColor: "#037d50 ", borderColor: "#037d50" }}
          >
            Sort by date ({sortOrder === "asc" ? "low to high" : "high to low"})
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="asc">Oldest</Dropdown.Item>
            <Dropdown.Item eventKey="desc">Newest</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Link to={`/concern-list`}>
          <Button
            variant="warning"
            style={{ fontSize: "0.8rem", padding: "0.2rem 0.5rem" }}
            className="btn-outline-dark py-2 px-3 my-5"
          >
            unDone Concerns
          </Button>
        </Link>
      </div>

      <Table striped responsive className="table-m-2">
        <thead>
          <tr>
            <th>Name and Date</th>
            <th>Concern</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts &&
            sortContactByDate(contacts)
              .filter((contact) => {
                return search.toLowerCase() === ""
                  ? contact
                  : contact.concern.toLowerCase().includes(search) ||
                      contact.name.toLowerCase().includes(search) ||
                      contact.name.toUpperCase().includes(search) ||
                      contact.concern.toUpperCase().includes(search);
              })
              .filter((contact) => contact.done)
              .map((contact) => (
                <tr key={contact.id}>
                  <td>
                    {contact.name} <br></br>
                    {new Date(contact.created_date).toLocaleString("en-US", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                  </td>
                  <td>{contact.concern}</td>
                  <td className="comment-cell">
                    <div className="comment">
                      {contact.comment.length > 100 ? (
                        <>
                          {expandedComments.includes(contact.id)
                            ? contact.comment
                            : `${contact.comment.substring(0, 100)}...`}
                          <a
                            onClick={(e) => handleReadMoreClick(e, contact.id)}
                            style={{ color: "gold" }}
                          >
                            {expandedComments.includes(contact.id)
                              ? "Read less"
                              : "Read more"}
                          </a>
                        </>
                      ) : (
                        contact.comment
                      )}
                    </div>
                  </td>
                  <td>
                    <Link to={`/contact-details/${contact.id}`}>
                      <Button
                        variant="warning"
                        style={{ fontSize: "0.8rem", padding: "0.2rem 0.5rem" }}
                        className="btn-outline-dark py-2 px-3 my-5"
                      >
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>

      <style jsx>{`
        .comment-cell {
          max-width: 300px;
        }

        .comment {
          height: auto;
          text-align: justify;
        }
      `}</style>
    </Container>
  );
}

export default ListContact;
