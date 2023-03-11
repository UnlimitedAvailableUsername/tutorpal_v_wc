import React from 'react'
import { Row, Col, Container } from "react-bootstrap";
import { faHouseSignal, faChalkboard, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Section() {
  return (
    <div className='bg-dark text-white'>
      <Container>
        <Row>
          <Col>
            <FontAwesomeIcon size="3x" style={{ width: '100%' }} className="mb-1 mt-5 justify-content-center" icon={faHouseSignal} />
            <h3 style={{ marginTop: 30, }} class="text-center font-weight-bold">100% Online</h3>
            <h6 style={{ marginTop: 55, }} class="text-center font-weight-bold">Easily access our user-friendly study materials via our trusted online platform — from home or anywhere.</h6>
          </Col>

          <Col>
            <FontAwesomeIcon size="3x" style={{ width: '100%' }} className="mb-1 mt-5 justify-content-center" icon={faChalkboard} />
            <h3 style={{ marginTop: 30, }} class="text-center font-weight-bold">Dedicated & Competent Tutors</h3>
            <h6 style={{ marginTop: 30, }} class="text-center font-weight-bold">Our tutors are in our team because of their competence and love for personalized teaching.</h6>
          </Col>

          <Col>
            <FontAwesomeIcon size="3x" style={{ width: '100%' }} className="mb-1 mt-5 justify-content-center" icon={faUser} />
            <h3 style={{ marginTop: 30, }} class="text-center font-weight-bold">Specific Mentoring</h3>
            <h6 style={{ marginTop: 55, }} class="text-center font-weight-bold">We work closely with you to effectively address learning gaps and propel progress.</h6>
          </Col>

          <Col>
            <FontAwesomeIcon size="3x" style={{ width: '100%' }} className="mb-1 mt-5 justify-content-center" icon={faUserShield} />
            <h3 style={{ marginTop: 30, }} class="text-center font-weight-bold">Safe Online
              Learning Environment
            </h3>
            <h6 style={{ marginTop: 30, }} class="text-center font-weight-bold">Our hub is a space where you are free to express yourselves, ask questions, and explore your strengths and possibilities.</h6>
          </Col>

        </Row>
    </Container></div>
  );
}

export default Section;
