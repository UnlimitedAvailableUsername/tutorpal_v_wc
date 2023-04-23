import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';

const PreviewMode = ({ disableButton, userInfo, handleToggleEdit }) => {

  return (
    <div>
      <Row>
        <Col>
        <Card className=" my-2 p-3 rounded" style={{backgroundColor: "#565656", width: 286, height: 490, }}>
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
                                  <strong>Username:</strong> {userInfo.username}
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
                                  <strong>Email:</strong> {userInfo.email}
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
                                  <strong>First Name:</strong> {userInfo.first_name}
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
                                  <strong>Last Name:</strong> {userInfo.last_name}
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
                                  <strong>Contact:</strong> {userInfo.contact}
                                </pre>
                              </Col>
                              </Row>
       </Row>
      </Card>
      
      </Col>
      <Col>
      <Card className=" my-2 p-3 rounded" style={{backgroundColor: "#565656", width: 963, height: 448}}>
      <Row>
                    <Col>
                    <p>BIO: {userInfo.bio ? (
              <>
                {userInfo.bio}
              </>
            ) : (
                <>
                  You haven't set your Bio. Add now so students can know more about you!
                </>
            )}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <pre style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 3}}><strong>Subjects:</strong>  </pre>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <pre style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 6 }}><strong>Meeting Link:</strong>  {userInfo.meeting_link}</pre>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={{fontSize: 18, fontFamily: "Calibri", marginBottom: 6 }}><strong>Schedules:</strong> </p>
                    </Col>
                  </Row>
      </Card>
      </Col>
      </Row>


      <h1>My Profile</h1>
      <div>
        <img src={userInfo.profile_picture} alt={userInfo.username} style={{width:150}}/>
      </div>
      <div>
        <h2>Username</h2>
        <p>{userInfo.username}</p>
      </div>
      <div>
        <h2>First Name</h2>
        <p>{userInfo.first_name}</p>
      </div>
      <div>
        <h2>Last Name</h2>
        <p>{userInfo.last_name}</p>
      </div>
      <div>
        <h2>Email</h2>
        <p>{userInfo.email}</p>
      </div>
      <div>
        <h2>Contact Details:</h2>
        <p>{userInfo.contact}</p>
      </div>
      {userInfo.tutor && (
        <>
          <div>
            <h2>Bio</h2>
            <p>{userInfo.bio ? (
              <>
                {userInfo.bio}
              </>
            ) : (
                <>
                  You haven't set your Bio. Add now so students can know more about you!
                </>
            )}</p>
          </div>
          <div>
            <h2>Hourly Price</h2>
            <p>{parseFloat(userInfo.price_rate_hour).toFixed(2)}</p>
          </div>
          <div>
            <h2>Subjects</h2>
            {userInfo.subjects.map((subject) => (
              <div key={subject.id}>
                <li>{subject.subject_title}</li>
              </div>
            ))}
          </div>
        </>
      )}
      <Button variant="warning" onClick={handleToggleEdit} disabled={disableButton}>Edit</Button>

    </div>
  
  )
}

export default PreviewMode;