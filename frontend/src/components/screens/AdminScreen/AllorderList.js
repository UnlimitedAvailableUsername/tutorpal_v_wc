import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Table, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { listAllOrders } from "../../../features/redux/actions/adminActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "../../../assets/components/screens/ScheduleScreen/secret.png";
import Dropdown from "react-bootstrap/Dropdown";

function AllorderList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [sessionStatusFilter, setSessionStatusFilter] = useState("");
  const handleSessionStatusFilterChange = (eventKey) => {
    setSessionStatusFilter(eventKey);
  };

  const handleStatusFilterChange = (eventKey) => {
    setStatusFilter(eventKey);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const adminorderlist = useSelector((state) => state.adminorderlist);
  const { loading, success, error, AllOrders } = adminorderlist;

  const handleButtonClick = () => {
    navigate(`/my-schedule-orders/`);
  };

  useEffect(() => {
    if (!userInfo) {
      // If the user is not authenticated, redirect to the login screen
      navigate(`/login?redirect=${location.pathname}`);
    } else if (AllOrders.length === 0 && !loading && !success && !error) {
      // Fetch the user's schedule orders if they are authenticated and their schedule orders are not yet loaded
      dispatch(listAllOrders());
    }
  }, [
    dispatch,
    navigate,
    location,
    userInfo,
    AllOrders,
    loading,
    success,
    error,
  ]);

  const handleSortOrderChange = (eventKey) => {
    setSortOrder(eventKey);
  };

  const sortUsersByDate = (users) => {
    if (sortOrder === "asc") {
      return users.sort(
        (a, b) => new Date(a.date_created) - new Date(b.date_created)
      );
    } else if (sortOrder === "desc") {
      return users.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
    } else {
      return users;
    }
  };
  let filteredOrders = AllOrders.filter(
    (order) =>
      (order.tutor &&
        order.tutor.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      order.tutor?.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (statusFilter === "done") {
    filteredOrders = filteredOrders.filter((order) => order.paid_status);
  } else if (statusFilter === "pending") {
    filteredOrders = filteredOrders.filter((order) => !order.paid_status);
  }

  if (sessionStatusFilter === "done") {
    filteredOrders = filteredOrders.filter(
      (order) => order.session_status 
    );
  } else if (sessionStatusFilter === "pending") {
    filteredOrders = filteredOrders.filter(
      (order) => !order.session_status 
    );
  }

  filteredOrders = sortUsersByDate(filteredOrders); // Add this line to sort the orders by date

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "150vh",
    backgroundAttachment: "fixed",
  };

  return (
    <div style={backgroundStyles}>
      <Container>
        <br />
        <br />
        <h1
          style={{
            textAlign: "center",
            fontSize: 100,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          All Orders
        </h1>
        <div className="d-flex justify-content-between">
          <Form.Control
            type="text"
            placeholder="Search by tutor name"
            className="mb-3"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

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
              <Dropdown.Item eventKey="desc">Newest</Dropdown.Item>
              <Dropdown.Item eventKey="asc">Oldest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown onSelect={handleStatusFilterChange}>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{ backgroundColor: "#037d50 ", borderColor: "#037d50" }}
            >
              {statusFilter ? `Status: ${statusFilter}` : "Filter by status"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="done">Done</Dropdown.Item>
              <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
              <Dropdown.Item eventKey="" active={!statusFilter}>
                Show all
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown onSelect={handleSessionStatusFilterChange}>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{ backgroundColor: "#037d50 ", borderColor: "#037d50" }}
            >
              {sessionStatusFilter
                ? `Session status: ${sessionStatusFilter}`
                : "Filter by session status"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="done">Done</Dropdown.Item>
              <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
              <Dropdown.Item eventKey="" active={!sessionStatusFilter}>
                Show all
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Card style={{ height: "auto" }} className="card px-5 p-3 mb-5 rounded">
          {loading ? (
            <LoadingIconBig />
          ) : error ? (
            <MessageAlert variant="danger">{error}</MessageAlert>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>ID</th>
                  <th>Tutor</th>
                  <th>Days involved:</th>
                  <th>Date Ordered</th>
                  <th>Total</th>
                  <th className="text-center">Paid Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((scheduleOrder) => (
                  <tr key={scheduleOrder.id}>
                    <td style={{ textAlign: "center" }}>{scheduleOrder.id}</td>
                    <td>
                      <h5>
                        {scheduleOrder.tutor ? (
                          <>
                            {scheduleOrder.tutor.first_name}{" "}
                            {scheduleOrder.tutor.last_name}
                          </>
                        ) : (
                          <>No tutor involved &#40;Luh Multong Order&#41;</>
                        )}
                      </h5>
                      {scheduleOrder.session_status ? (
                        <p>Session completed.</p>
                      ) : (
                        <p>Session has not happened.</p>
                      )}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {scheduleOrder.schedules
                        .map((schedule) => schedule.name)
                        .join(", ")}
                    </td>
                    <td>
                      {new Date(scheduleOrder.date_created).toLocaleString(
                        "en-US",
                        {
                          dateStyle: "short",
                          timeStyle: "short",
                        }
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {scheduleOrder.total_amount}
                    </td>
                    <td className="text-center">
                      {scheduleOrder.paid_status ? (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} color="red" />
                      )}
                    </td>
                    <td className="text-center">
                      <Link to={`/my-schedule-orders/${scheduleOrder.id}`}>
                        <Button variant="warning">Details</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </Container>
    </div>
  );
}

export default AllorderList;
