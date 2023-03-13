import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Tutor() {
  return (
    <Card>
      <Card.Body>
        <Link to={`/tutor/<id>`}>
            <Card.Img src={} className="card-img-top img-fluid rounded" style={{ width: "auto", height: "24em", objectFit: "cover" }} />
        </Link>
        <Card.Title as="div">
          <strong>
            {/* {tutor.user.username} */}
          </strong>
        </Card.Title>
        <Card.Text>
            bio goes here
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">
            Rated <b>... / 5</b>
          </div>
          <div className="my-3">
            by ... users
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Tutor;