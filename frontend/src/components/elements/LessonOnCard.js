import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

 
function Product( {product }) {
  return (
    <Card className="my-3 p-3 rounded">
    <Link to={`products/${product._id}`}>
    </Link>
    <Card.Body>
      <Link to={`products/${product._id}`}>
        <Card.Title>
          <strong>{product.lesson_name}</strong>
        </Card.Title>
      </Link>
      <Card.Text as="div">
        <div> Subject: {product.subject_name} <br></br>
       Tutor:   {product.user}
        </div>
      </Card.Text>
      <Card.Text >
        Schedule: {product.schedule} <br></br>
        Php: {product.rate_hour}
              </Card.Text>
    </Card.Body>
  </Card>
  )
}

export default Product;