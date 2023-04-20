import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { listTutorsAdmin } from "../../../features/redux/actions/tutorActions";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../assets/components/screens/TutorListScreen/tutorlist.css";

function AdminTutor() {
  const [search, setSearch] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");

  // function para ma sort by review or price

  const sortUsersByDate = (users) => {
    if (sortOrder === "asc") {
      return users.sort(
        (a, b) => new Date(a.date_joined) - new Date(b.date_joined)
      );
    } else if (sortOrder === "desc") {
      return users.sort(
        (a, b) => new Date(b.date_joined) - new Date(a.date_joined)
      );
    }
  };

  const handleSortOrderChange = (eventKey) => {
    setSortOrder(eventKey);
  };
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.userState);
  const { userInfo } = loginUser;

  const adminlistTutors = useSelector((state) => state.adminlistTutors);
  const { users } = adminlistTutors;

  useEffect(() => {
    dispatch(listTutorsAdmin());
  }, [dispatch]);

  return (
    <div>
      <div className="tutor-bg"></div>
      <div className="tutor-bg-text-overlay text-center">
        <h1 className="text-uppercase tutor-text-h1">Inactive tutors</h1>
        <h4>List of Inactive accounts for tutors</h4>
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
            Sort by date ({sortOrder === "asc" ? "Oldest" : "Newest"})
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="asc">Oldest</Dropdown.Item>
            <Dropdown.Item eventKey="desc">Newest</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Link to={`/user-list`}>
          <Button
            variant="warning"
            style={{ fontSize: "0.8rem", padding: "0.2rem 0.5rem" }}
            className="btn-outline-dark py-2 px-3 my-5"
          >
            Active Users
          </Button>
        </Link>
      </div>
        <br></br>
        <Table striped responsive className="table-m-2">
          <thead>
            <tr>
              <th>Name and Date</th>
              <th>Photo</th>
              <th>Is Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              sortUsersByDate(users)
                .filter(
                  (user) =>
                    user.tutor &&
                    user.active === false && // filter only inactive tutors
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
                .map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user.first_name} {user.last_name} <br />
                      {user.email} <br />
                      {user.date_joined}
                    </td>
                    <td>
                      {user.profile_picture && (
                        <img
                          src={`${user.profile_picture}`}
                          alt="User Profile"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      )}
                    </td>
                    <td>{user.active ? "true" : "false"}</td>
                    <td>
                      <Link to={`/tutors-admit/details/${user.id}`}>
                        <Button
                          variant="warning"
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.2rem 0.5rem",
                          }}
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
      </Container>
    </div>
  );
}

export default AdminTutor;
