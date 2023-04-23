import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { listTutorsAdmin } from "../../../features/redux/actions/tutorActions";
import { deleteUser } from "../../../features/redux/actions/adminActions";
import { Button, Col, Container, Row, Table, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../assets/components/screens/TutorListScreen/tutorlist.css";
import backgroundImage from  '../../../assets/components/screens/ScheduleScreen/secret.png'
import { faDeleteLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        // handle error
      }
    }
  };

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '200vh',
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
  <br/><br/>

      <Container>
      <h1 style={{  textAlign: "center", fontSize: 100, textShadow:'2px 2px 4px rgba(0, 0, 0, 0.3)'}}>INACTIVE TUTORS</h1> 
      <Card style={{width: 1300, margin: 'auto', }} className='card px-5   p-3 mb-1 rounded'>
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
              className="btn-outline py-2 px-3 my-5"
            >
              Active Users
            </Button>
          </Link>
        </div>
        <br></br>
        <Table striped responsive className="table-m-2">
          <thead>
            <tr style={{textAlign: 'center'}}>
              <th>NAME & DATE</th>
              <th>PHOTO</th>
              <th>IS ACTIVE</th>
              <th>ACTION</th>
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
                  <tr style={{textAlign: 'center'}} key={user.id}>
                    <td>
                      {user.first_name} {user.last_name} <br />
                      {user.email} <br />
                      {new Date(user.date_joined).toLocaleString("en-US", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
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
                          title="Details"
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.2rem 0.5rem",
                          }}
                          className="btn-outline py-2 px-3 my-5 me-2"
                        >
                           <FontAwesomeIcon icon={ faEllipsis} />
                        </Button>
                      </Link>

                      <button
                        type="button"
                        title="Delete"
                        className="btn btn-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                       <FontAwesomeIcon icon={ faDeleteLeft } />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
        </Card>
      </Container>

    </div>
  );
}

export default AdminTutor;
