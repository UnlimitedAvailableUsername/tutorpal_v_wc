import "../../../assets/components/screens/ContactScreen/Contact.css";
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Widgets() {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="contact-widget">
                        <div className="contact-widget-item">
                            <div className="icon">
                                <FontAwesomeIcon size="lg" icon={faLocationDot} />
                            </div>
                            <div className="text">
                                <h5>Address</h5>
                                <p> #1 Holy Angel Avenue, Sto. Rosario St. Angeles City 2009 </p>
                            </div>
                        </div>

                        <div className="contact-widget-item">
                            <div className="icon">
                                <FontAwesomeIcon size="lg" icon={faPhone} />
                            </div>
                            <div className="text">
                                <h5>Contact Us</h5>
                                <p>0961-739-2086</p>
                            </div>
                        </div>

                        <div className="contact-widget-item">
                            <div className="icon">
                                <FontAwesomeIcon size="lg" icon={faEnvelope} />
                            </div>
                            <div className="text">
                                <h5>E-Mail</h5>
                                <p>tutorpal@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Widgets