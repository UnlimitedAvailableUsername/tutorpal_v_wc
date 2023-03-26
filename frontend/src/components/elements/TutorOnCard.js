import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Tutor({user}) {
  return (
    <Card className="my-3 p-3 rounded">
    <Link to={`tutor/${user.id}`}>
      <Card.Img style={{height:256}} src={user.profile_picture} />
    </Link>
    <Card.Body>
      <Link to={`tutor/${user.id}`}>

        
        <Card.Title>
          <strong>{user.first_name} {user.last_name}</strong>
        </Card.Title>
      </Link>
      <Card.Text as="div">
        <div> 

        </div>
        <div> Main Subject: {user.subject} <br></br> </div>
      </Card.Text>
      <Card.Text >
     {user.bio}
              </Card.Text>
    </Card.Body>
  </Card>
  )
}

export default Tutor;