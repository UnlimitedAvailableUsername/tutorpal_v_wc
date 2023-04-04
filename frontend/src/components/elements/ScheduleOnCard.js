import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Product( {schedule }) {
  return (
    <Card className="my-3 p-3 rounded">
    <Link to={`products/${schedule._id}`}>
    </Link>
    <Card.Body>
      <Link to={`products/${schedule._id}`}>
        <Card.Title>
          <strong>{schedule.lesson_name}</strong>
        </Card.Title>
      </Link>
      <Card.Text as="div">
        <div> Subject: {schedule.subject_name} <br></br>
       Tutor:   {schedule.user}
        </div>
      </Card.Text>
      <Card.Text >
        Schedule: {schedule.schedule} <br></br>
        Php: {schedule.rate_hour}
              </Card.Text>
    </Card.Body>
  </Card>
  )
}

export default Product;