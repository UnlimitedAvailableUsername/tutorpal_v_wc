import React from 'react';
import { Button, Card, Row, Col, Table, Container } from 'react-bootstrap';
import MessageAlert from '../../elements/MessageAlert';
import backgroundImage from  '../../../assets/components/screens/ScheduleScreen/secret.png'

const PreviewMode = ({ disableButton, userInfo, handleToggleEdit }) => {
  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '220vh',
    backgroundAttachment: 'fixed',
  }; 
  return (
    <div  >
      <Row>
        <Col>
        <Card className=" my-2 p-3 rounded mt-5" style={{backgroundColor: "#565656", width: 286, height: 580, }}>
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
                                  }}
                                >
                                  <strong>Contact:</strong><Card style={{textAlign: 'center'}} variant="dark"  > {userInfo.contact}</Card> 
                                </pre>
                              </Col>
                              <Container>
                              <Button   variant="warning" onClick={handleToggleEdit} disabled={disableButton}>Edit</Button>
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
                  <MessageAlert variant="dark"></MessageAlert>
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
        </Row>
        
      </Card>
      </Col>
      </Row>


    

    </div>
  
  )
}

export default PreviewMode;