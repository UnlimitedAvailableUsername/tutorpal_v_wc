import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listTutorsAdmin } from "../../../features/redux/actions/tutorActions";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../assets/components/screens/TutorListScreen/tutorlist.css";

function AdminUserList() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [userRole, setUserRole] = useState("");
  const [isActive, setIsActive] = useState("");

  const handleUserRoleChange = (eventKey) => {
    setUserRole(eventKey);
  };

  const handleSortOrderChange = (eventKey) => {
    setSortOrder(eventKey);
  };

  const filterUsersByActive = (users) => {
    if (isActive === "") {
      return users;
    } else if (isActive === "true") {
      return users.filter((user) => user.active === true);
    } else if (isActive === "false") {
      return users.filter((user) => user.active === false);
    }
  };

  const handleActiveChange = (eventKey) => {
    setIsActive(eventKey);
  };

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

    return users;
  };

  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.userState);
  const { userInfo } = loginUser;

  const adminlistTutors = useSelector((state) => state.adminlistTutors);
  const { users } = adminlistTutors;

  useEffect(() => {
    dispatch(listTutorsAdmin());
  }, [dispatch]);


  
  const handleDelete = async (tutorId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const user = users.find((user) => user.id === tutorId);
        const currentUser = userInfo.id; // Define currentUser before using it
        if (user.id !== currentUser) {
          await dispatch(deleteUser(tutorId, user));
          window.location.reload();
        } else {
          alert("You cannot delete yourself!");
        }
      } catch (error) {
        console.log(error);
        // handle error
      }
    }
  };

  return (
    <div>
      <div className="tutor-bg"></div>
      <div className="tutor-bg-text-overlay text-center">
        <h1 className="text-uppercase tutor-text-h1">Active Accounts</h1>
        <h4>List of Active accounts </h4>
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

          <Dropdown onSelect={handleUserRoleChange}>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{ backgroundColor: "#037d50 ", borderColor: "#037d50" }}
            >
              Filter by Role ({userRole || "All"})
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">All</Dropdown.Item>
              <Dropdown.Item eventKey="tutor">Tutor</Dropdown.Item>
              <Dropdown.Item eventKey="student">Student</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown onSelect={handleActiveChange}>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{ backgroundColor: "#037d50 ", borderColor: "#037d50" }}
            >
              Filter by active ({isActive === "" ? "All" : isActive})
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">All</Dropdown.Item>
              <Dropdown.Item eventKey="true">Active</Dropdown.Item>
              <Dropdown.Item eventKey="false">Inactive</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Row className="my-4">
  <Col>
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Active</th>
          <th>Date Joined</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>

      {users &&
        sortUsersByDate(filterUsersByActive(users))
          .filter((user) => {
            if (userRole === "") {
              return true;
            } else if (userRole === "tutor") {
              return user.tutor;
            } else if (userRole === "student") {
              return user.student;
            }
          })
          .filter(
            (user) =>
              search === "" ||
              user.username.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.tutor ? "Tutor" : user.student ? "Student" : ""}
              </td>
              <td>{user.active ? "true" : "false"}</td>
              <td>{new Date(user.date_joined).toDateString()}</td>
              <td>
                <Link to={`/subject-edit/`}>
                  <button type="button" className="btn btn-warning">
                    Edit
                  </button>
                </Link>
                <Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                  </Link>
              </td>
            </tr>
          ))}
    </Table>
  </Col>
</Row>
</Container>

    </div>
  );
}

export default AdminUserList;
