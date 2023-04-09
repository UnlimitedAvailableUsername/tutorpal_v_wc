import React from "react";
import { Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import "../../assets/components/elements/Footer/footer.css";

function Footer() {
  return (
    <div className="main-footer bg-dark">
      <div className="container">

       

        <div className="row">
        <hr></hr>
          <p className="col-sm text-uppercase">
            {(new Date().getFullYear())} tutorpal inc © | all rights reserved | terms of service | privacy policy
          </p>
          <hr></hr>
        </div>

      </div>

    </div>
  );
};

export default Footer;
