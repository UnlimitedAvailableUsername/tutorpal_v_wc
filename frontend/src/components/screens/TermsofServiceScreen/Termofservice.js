import React, { useState, useEffect } from 'react'

import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'


function TermsofServiceScreen() {

    return (
      <div>
      <Row className="justify-content-center align-items-center">
          <Col xl={8} xs={10}>
              <Card className="px-4 my-5">
                  <Card.Body>
                      <div className="mb-3 mt-md-4">
                          <div className='mb-5' >
                              <h2 className="fw-bold text-uppercase ">TERMS OF SERVICE</h2>
                          </div>
                          <div className="mb-3">
                     <h6>Welcome to our online tutoring service! These terms of service (the "Terms") govern your use of our website, mobile application, and other online services (the "Service"). By using the Service, you agree to these Terms. If you do not agree to these Terms, you should not use the Service. <br></br><br></br>

                                <h5>Service Description<br></br></h5>
                                Our Service allows students to connect with tutors for online tutoring sessions. Our tutors are independent contractors who provide tutoring services through our Service. We do not guarantee the accuracy, completeness, or quality of the tutoring services provided by our tutors.
                                <br></br><br></br>
                                <h5>Account Registration<br></br></h5>
                                To use our Service, you must create an account and provide us with accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account and password, and you agree to accept responsibility for all activities that occur under your account or password.
                                <br></br><br></br>
                                Payment<br></br>
                                You agree to pay all fees and charges associated with your use of the Service. We may change our fees and charges at any time, but we will notify you of any changes before they take effect.
                                <br></br><br></br>
                                Intellectual Property<br></br>
                                Our Service and all materials contained on the Service, including without limitation, text, graphics, logos, images, and software, are owned or licensed by us and are protected by intellectual property laws. You may not use, copy, reproduce, modify, distribute, transmit, or display any of the materials on the Service without our prior written permission.
                                <br></br><br></br>
                                User Content<br></br>
                                You are solely responsible for any content that you post, upload, publish, or display on the Service, including without limitation, any text, graphics, photos, or other materials (collectively, "User Content"). You retain ownership of your User Content, but you grant us a non-exclusive, royalty-free, worldwide, perpetual, irrevocable license to use, copy, modify, display, distribute, and create derivative works of your User Content in connection with the Service.
                                <br></br><br></br>
                                Termination<br></br>
                                We may terminate your account and your access to the Service at any time and for any reason, including without limitation, if you violate these Terms.
                                <br></br><br></br>
                                Disclaimer of Warranties<br></br>
                                THE SERVICE IS PROVIDED "AS IS" AND WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WE MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING THE ACCURACY, RELIABILITY, COMPLETENESS, OR TIMELINESS OF THE SERVICE OR ANY INFORMATION PROVIDED THROUGH THE SERVICE. WE DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION, WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                                <br></br><br></br>
                                Limitation of Liability<br></br>
                                IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, INCLUDING WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, LOSS OF DATA, LOSS OF USE, OR OTHER INTANGIBLE LOSSES. OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE OF THE SERVICE SHALL NOT EXCEED THE AMOUNTS PAID BY YOU TO US DURING THE SIX-MONTH PERIOD PRIOR TO THE DATE OF THE CLAIM.
                                <br></br><br></br>
                                Governing Law and Jurisdiction<br></br>
                                These Terms shall be governed by and construed in accordance with the laws of the state of [STATE], without giving effect to any principles of conflicts of law. Any legal action or proceeding arising out of or in connection with these Terms or the Service shall be brought exclusively in the state or federal courts located in [COUNTY], [STATE], and you consent to the jurisdiction of such courts.
                                <br></br><br></br>
                                Changes to these Terms<br></br>
                                We may change these Terms at any time, and such changes will be effective immediately</h6>
                
                          </div>
                      </div>
                  </Card.Body>
              </Card>
          </Col>
      </Row>
     

  </div>
    )
}


export default TermsofServiceScreen
