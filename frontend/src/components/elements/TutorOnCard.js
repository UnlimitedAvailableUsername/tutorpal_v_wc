import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from './Rating'
import ReadMore from "./Readmore";

function Tutor({ user }) {

  return (
   
    <Row >
    <Card  style={{backgroundColor:"#404040", width: 5000}}className=" sm- my-10 p-3 rounded">

<Row>
<Col xs={3}>
      <Link to={`tutor/${user.id}`}>
        <Card.Img  style={{ height: 303 }} src={`${user.profile_picture}`} />
      </Link>

      </Col>

<Col >
      <Card.Body style={{width: 950}}>    
        <Link to={`tutor/${user.id}`}>
          <Card.Title>
            <strong>
              {user.first_name} {user.last_name}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div></div>
          <div>
            {" "}
            Main Subject: {user.subject} <br></br>{" "}
          </div>
        </Card.Text>
        <Card.Text style={{color: '#D3D3D3'}}> {user.bio}</Card.Text>

        {/* <ReadMore text={user.bio} maxLength={100} />  */}


        <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={user.rating} text={`${user.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>


                <Card.Text as="h3">
                    ${user.price_rate_hour} /hr
                </Card.Text>

            </Card.Body>
            </Col>
            </Row>

    </Card>
    </Row>
  );
}

export default Tutor;
