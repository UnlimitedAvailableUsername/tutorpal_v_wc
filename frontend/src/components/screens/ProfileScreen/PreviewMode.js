import React from 'react';
import { Button, Card, Row, Col, Table, Container } from 'react-bootstrap';
import MessageAlert from '../../elements/MessageAlert';
import backgroundImage from  '../../../assets/components/screens/ScheduleScreen/secret.png'
import { Link } from 'react-router-dom';



import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { listMyScheduleOrders } from "../../../features/redux/actions/scheduleOrderActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";




const PreviewMode = ({ disableButton,  handleToggleEdit }) => {
  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '220vh',
    backgroundAttachment: 'fixed',
  }; 




  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;

  const scheduleOrderListState = useSelector(
    (state) => state.scheduleOrderListState
  );
  const { loading, success, error, scheduleOrders } = scheduleOrderListState;

  const handleButtonClick = () => {
    navigate(`/my-schedule-orders/`);
  };

  useEffect(() => {
    if (!userInfo) {
      // If the user is not authenticated, redirect to the login screen
      navigate(`/login?redirect=${location.pathname}`);
    } else if (scheduleOrders.length === 0 && !loading && !success && !error) {
      // Fetch the user's schedule orders if they are authenticated and their schedule orders are not yet loaded
      dispatch(listMyScheduleOrders());
    }
  }, [
    dispatch,
    navigate,
    location,
    userInfo,
    scheduleOrders,
    loading,
    success,
    error,
  ]);




  return (
    <div  >
      <Row>
        <Col>
        <Card className=" my-2 p-3 rounded mt-5" style={{backgroundColor: "#565656", width: 286, height: 646, }}>
        <Row>
        <Col>
                            <p>
                              <img
                                src={userInfo.profile_picture}
                                style={{ width: 250 }}
                                alt="Profile"
                              /> </p> 
                              </Col> 

                              <Row>
                              <Col>
                                <pre
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "Calibri",
                                    marginBottom: 3,
                                    width: 250
                                    
                                  }}
                                >
                                  <strong>Username:</strong> <Card style={{textAlign: 'center'}} variant="dark"  > {userInfo.username}</Card>
                                </pre>
                              </Col> 
                              <Col>
                                <pre
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "Calibri",
                                    marginBottom: 3,
                                    width: 250
                                  }}
                                >
                                  <strong>Email:</strong> <Card style={{textAlign: 'center'}} variant="dark"  >{userInfo.email}</Card>
                                </pre>
                              </Col>
                              <Col>
                                <pre
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "Calibri",
                                    marginBottom: 3,
                                    width: 250
                                  }}
                                >
                                  <strong>First Name:</strong> <Card style={{textAlign: 'center'}} variant="dark"  >{userInfo.first_name}</Card> 
                                </pre>
                              </Col>
                              <Col>
                                <pre
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "Calibri",
                                    marginBottom: 3,
                                    width: 250
                                  }}
                                >
                                  <strong>Last Name:</strong> <Card style={{textAlign: 'center'}} variant="dark"  > {userInfo.last_name}</Card>
                                </pre>
                              </Col>
                              <Col>
                                <pre
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "Calibri",
                                    marginBottom: 8,
                                    width: 250
                                  }}
                                >
                                  <strong>Contact:</strong><Card style={{textAlign: 'center'}} variant="dark"  > {userInfo.contact}</Card> 
                                </pre>
                              </Col>
                   
                              <Container>
                                 <Button variant="warning" onClick={handleToggleEdit} disabled={disableButton}>Edit</Button>{' '}
                                  <span style={{ width: '25px', display: 'inline-block' }}></span>
                                
                                  {userInfo.tutor  && <Button as={Link} to={`/guide`} className="btn-warning me-2">How to get Paid</Button>}
                              </Container>
                                 
                      


                              </Row>
       </Row>
      </Card>
      </Col>





      <Col>
      <Card className=" my-2 p-3 rounded mt-5" style={{backgroundColor: "#565656", width: 963, height: 'auto'}}>
      <Row>
        

      {userInfo.tutor && (
    <>
      <div>
        <Row>
          <Col>
            <p style={{ fontSize: 18, fontFamily: "Calibri", marginBottom: 3 }}>
              <strong>BIO: </strong>
              {userInfo.bio ? (
                <>
                  <MessageAlert variant="dark">{userInfo.bio}</MessageAlert>
                </>
              ) : (
                <>
                  <MessageAlert variant="dark">
                    You haven't set your Bio. Add now so students can know more about you!
                  </MessageAlert>
                </>
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <pre style={{ fontSize: 18, fontFamily: "Calibri", marginBottom: 3 }}>
              <strong>HOURLY PRICE:</strong>{" "}
              <MessageAlert variant="dark">{parseFloat(userInfo.price_rate_hour).toFixed(2)}</MessageAlert>
            </pre>
          </Col>
        </Row>
        <Row>
          <Col>
            <pre style={{ fontSize: 18, fontFamily: "Calibri", marginBottom: 6 }}>
              <strong>SUBJECTS:</strong>{" "}
              <MessageAlert variant="dark">
                {userInfo.subjects.map((subject) => (
                  <div key={subject.id}>
                    <li>{subject.subject_title}</li>
                  </div>
                ))}
              </MessageAlert>
            </pre>
          </Col>
        </Row>
        <Row>
          <Col>
            <pre style={{ fontSize: 18, fontFamily: "Calibri", marginBottom: 6 }}>
              <strong>MEETING LINK:</strong>{" "}
              <MessageAlert variant="dark">
                {userInfo.meeting_link}
              </MessageAlert>
            </pre>
          </Col>
        </Row>
        <Row>
          <Col>
            <p style={{ fontSize: 18, fontFamily: "Calibri", marginBottom: 6 }}>
              <strong>SCHEDULES:</strong> <MessageAlert variant="dark">
              {userInfo.schedules && userInfo.schedules.filter((schedule) => schedule.count_in_stock > 0).length > 0 ? (
                <Col>
                  <Table style={{ border: "1px solid #ccc" }} striped responsive className="table-m-2 mb-1">
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>DATE</th>
                        <th style={{ textAlign: "center" }}>HOURS AVAILABLE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userInfo.schedules
                        .filter((schedule) => schedule.count_in_stock > 0)
                        .map((schedule) => (
                          <tr key={schedule.id}>
                            <td style={{ textAlign: "center" }}>{schedule.name}</td>
                            <td style={{ textAlign: "center" }}>{schedule.count_in_stock}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Col>
              ) : (
                <Col>No schedules available at the moment</Col>
              )}
            </MessageAlert>
            </p>
           
          </Col>
        </Row>
      </div>
    </>
)}  





      {userInfo.student && (
    <>
      <div>
      {loading ? (
        <LoadingIconBig />
      ) : error ? (
        <MessageAlert variant="danger">{error}</MessageAlert>
      ) : (
<>
        <h1 style={{ textAlign: "center",  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  }}>MY SCHEDULES</h1>
        <Table  variant='dark' striped bordered hover responsive className="table-sm">
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
            {scheduleOrders.slice(0, 5).reverse().map((scheduleOrder) => (
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
                  {scheduleOrder.schedules.map((schedule) => schedule.name)
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
        <Link to={`/my-schedule-orders/`}>
                    <Button variant="primary">See More</Button>
                  </Link>
        </>)}
   
      </div>
    </>
)}  
        </Row>
        
      </Card>
      </Col>
      </Row>


    

    </div>
  
  )
}

export default PreviewMode;