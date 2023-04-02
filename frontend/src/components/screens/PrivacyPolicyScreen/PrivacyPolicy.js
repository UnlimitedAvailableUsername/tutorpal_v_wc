import React, { useState, useEffect } from 'react'

import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'


function PrivacyPolicyScreen() {

    return (
      <div>
      <Row className="justify-content-center align-items-center">
          <Col xl={8} xs={10}>
              <Card className="px-4 my-5">
                  <Card.Body>
                      <div className="mb-3 mt-md-4">
                          <div className='mb-5' >
                              <h2 className="fw-bold text-uppercase ">privacy policy</h2>
                          </div>
                          <div className="mb-3">
                     <h6>At [website name], we are committed to protecting your privacy. We collect personal information such as your name, email address, and payment information to provide our tutoring services and improve our website. We use industry-standard security measures to protect your data and do not share your personal information with third parties except as necessary to provide our services. <br></br><br></br>

                            We may use cookies and similar technologies to personalize your experience and track usage of our website. We may also collect non-personal information such as your browser type and IP address to improve our website and marketing efforts.<br></br><br></br>

                            By using our website and services, you consent to the terms of this Privacy Policy. If you have any questions or concerns about our privacy practices, please contact us at [contact email].</h6>
                
                          </div>
                      </div>
                  </Card.Body>
              </Card>
          </Col>
      </Row>
     

  </div>
    )
}


export default PrivacyPolicyScreen
