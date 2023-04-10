import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listContacts } from "../../../features/redux/actions/contactActions";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderTutor from "../../elements/HeaderTutor";
function ListContact() {
  const [search, setSearch] = useState("");
  const [expandedComments, setExpandedComments] = useState([]);
  const dispatch = useDispatch();

  const contactList = useSelector((state) => state.contactList);
  const { contacts } = contactList || {};

  useEffect(() => {
    dispatch(listContacts());
  }, [dispatch]);

  const handleReadMoreClick = (e, commentId) => {
    e.preventDefault();
    if (!expandedComments.includes(commentId)) {
      setExpandedComments([...expandedComments, commentId]);
    } else {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    }
  };

  return (
<>
    <HeaderTutor/>
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

      <p>Total concerns: {contacts && contacts.length}</p>

      <Table striped responsive className="table-m-2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Concern</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts &&
            contacts
              .filter((contact) => {
                return search.toLowerCase() === ""
                  ? contact
                  : contact.concern.toLowerCase().includes(search) ||
                      contact.name.toLowerCase().includes(search) ||
                      contact.name.toUpperCase().includes(search) ||
                      contact.concern.toUpperCase().includes(search);
              })
              .map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
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
                      className="btn-outline-dark py-2 px-3 my-5"
                    >
                      Back to Concern List
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
    </>
  );
}

export default ListContact;
