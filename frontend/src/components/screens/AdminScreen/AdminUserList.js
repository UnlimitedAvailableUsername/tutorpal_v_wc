import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsersAdmin, } from "../../../features/redux/actions/adminActions";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../assets/components/screens/TutorListScreen/tutorlist.css";
import backgroundImage from '../../../assets/components/screens/ScheduleScreen/secret.png'
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets/components/screens/AdminScreen/AdminScreen.css"

function AdminUserList() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [userRole, setUserRole] = useState("");
  const [isActive, setIsActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    } else {
      return users;
    }
  };

  const loginUser = useSelector((state) => state.userState);
  const { userInfo } = loginUser;

  const adminlistTutors = useSelector((state) => state.adminlistTutors);
  const { users } = adminlistTutors;

  useEffect(() => {
    dispatch(listUsersAdmin());
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
          alert("You can only play yourself not DELETE IT!!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (userId, userInfo, users, navigate) => {
    const currentUser = userInfo.id;
    const user = users.find((user) => user.id === userId);
    if (user.id === currentUser) {
      alert("Why are you editing yourself here are you a Masochist?");
      return;
    }
    // edit user's account
    navigate(`/user-edit/${userId}`);
  };

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '280vh',
    backgroundAttachment: 'fixed',
  }; 

  return (

    <div style={backgroundStyles}>
      <style jsx>{`
        .card {
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }

        .one {
          display: flex;
          justify-content: center;
        }
      `}</style>
      
    <Container >
    <div style={{ height: '45px' }}></div>
    <h1 style={{ textAlign: "center", fontSize: 100, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  }}>ALL USERS</h1>
    <Card style={{ width: 1300, margin: 'auto', }} className='card px-5   p-3 mb-1 rounded'>
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }} >
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
            <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
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
              <tr style={{textAlign: 'center'}}>
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
                  } else if (userRole === "admin") {
                    return user.staff;
                  }
                })
                .filter(
                  (user) =>
                    search === "" ||
                    user.username.toLowerCase().includes(search.toLowerCase())
                )
                .map((user) => (
                  <tr  style={{textAlign: 'center'}} key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.tutor
                        ? "Tutor"
                        : user.student
                          ? "Student"
                          : user.staff
                            ? "Admin"
                            : "None"}
                    </td>
                    <td>{user.active ? "true" : "false"}</td>
                    <td>
                      {new Date(user.date_joined).toLocaleString("en-US", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>

                    <td>
                      <Button type="button"  title="Edit" className="btn btn-warning me-2 px-2" onClick={() => handleEdit(user.id, userInfo, users, navigate) } style={{ backgroundColor: "#F3AA22" }} >
                      <FontAwesomeIcon icon={ faEdit } />
                      </Button>

                      <Button type="button" title="Delete" className="btn btn-danger px-2" onClick={() => handleDelete(user.id)} style={{ backgroundColor: " #C50808" }} >
                      <FontAwesomeIcon icon={ faDeleteLeft } />
                      </Button>

                    </td>
                  </tr>
                ))}
          </Table>
        </Col>
      </Row>
    </Card>
  </Container>
  </div>
  )
};

export default AdminUserList;
