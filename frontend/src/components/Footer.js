import react from "react";
import { Row, Col } from 'react-bootstrap'
import "../assets/components/Footer/footer.css";

const Footer = () => {
  return (
    <div className="main-footer bg-dark">
      <div className="container">

        <hr />

        <Row>
            
          {/* Column1 */}

          <Col>
            <h4 className="text-uppercase">TutorPal Inc.</h4>
            <ul className="list-unstyled">
              <li>Holy Angel University</li>
              <li>#1 Holy Angel Avenue, Sto. Rosario St.</li>
              <li>Angeles City 2009</li>
              <li>0961-739-2086</li>
            </ul>
          </Col>

          {/* Column2 */}

          <Col>
            <h4 className="text-uppercase">staff</h4>
            <ul className="list-unstyled">
              <li>Manuel Mendez</li>
              <li>Timothy Asuncion</li>
              <li>Mark Railey Yutuc Generoso</li>
              <li>Marc Joshua Beltran</li>
              <li>Jan Russel Laxa</li>
            </ul>
          </Col>

          {/* Column3 */}

          <Col>
            <h4 className="text-uppercase">learn with us</h4>
            <ul className="list-unstyled">
              <li>Find a Tutor</li>
              <li>Online Tutoring</li>
              <li>Get Math Help</li>
              <li>Learning Resources</li>
            </ul>
          </Col>
        </Row>
        <hr />

        <div className="row">
          <p className="col-sm text-uppercase">
            {(new Date().getFullYear())} tutorpal inc © | all rights reserved | terms of service | privacy policy
          </p>
        </div>

      </div>

    </div>
  );
};

export default Footer;
