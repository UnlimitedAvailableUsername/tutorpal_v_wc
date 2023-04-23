import React from "react";
import { useEffect } from "react";
import { Button, Container, Table, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { listAllOrders } from "../../../features/redux/actions/adminActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "../../../assets/components/screens/ScheduleScreen/secret.png";

function AllorderList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
  
    const userState = useSelector((state) => state.userState);
    const { userInfo } = userState;
  
    const adminorderlist = useSelector(
      (state) => state.adminorderlist
    );
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
  
    const backgroundStyles = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      height: "150vh",
      backgroundAttachment: "fixed",
    };
  
  return (
    <div  style={backgroundStyles}>
    <Container>
      <br/><br/>
    <h1 style={{ textAlign: "center", fontSize: 100, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  }}>MY SCHEDULES</h1>

      <Card style={{height: 'auto'}} className="card px-5 p-3 mb-5 rounded">
      {loading ? (
        <LoadingIconBig />
      ) : error ? (
        <MessageAlert variant="danger">{error}</MessageAlert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr style={{textAlign: 'center'}}>
              <th>ID</th>
              <th>Tutor</th>
              <th>Days involved:</th>
              <th>Total</th>
              <th className="text-center">Paid Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {AllOrders.map((scheduleOrder) => (
              <tr key={scheduleOrder.id}>
                <td style={{textAlign: 'center'}}>{scheduleOrder.id}</td>
                <td>
                  <h5>
                    {scheduleOrder.tutor ? (
                      <>
                        {scheduleOrder.tutor.first_name}{" "}
                        {scheduleOrder.tutor.last_name}
                      </>                   
                    ) : (
                        <>
                          No tutor involved &#40;Luh Multong Order&#41;
                        </>
                    )}
                  </h5>
                  {scheduleOrder.session_status ? (
                    <p>Session completed.</p>
                  ) : (
                    <p>Session has not happened.</p>
                  )}
                </td>



                <td style={{textAlign: 'center'}}>
                  {scheduleOrder.schedules
                    .map((schedule) => schedule.name)
                    .join(", ")}
                </td>
                <td style={{textAlign: 'center'}}>{scheduleOrder.total_amount}</td>
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


export default AllorderList