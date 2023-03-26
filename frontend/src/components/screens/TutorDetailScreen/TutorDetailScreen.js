import React, { useEffect} from "react";
import { Row, Col, Image, ListGroup, Button,Container} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import { listTutorDetails} from "../../../features/redux/actions/tutorActions"


function TutorDetailScreen() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const tutorDetails = useSelector((state) => state.tutorDetails)
  const {error, loading, user} = tutorDetails
  useEffect(() => {
    dispatch(listTutorDetails(id))

  }, [dispatch]);


  return (
    <div class="affix ">

        <Link to="/tutor-list" className="btn btn-warning btn-outline-dark my-3  ">
            Fuck, Go Back
        </Link>
 
        <Container>
            <Row>
                
                <Col  md={{ span: 3, offset: 1 }} style={{position: "relative"}}>
                <Image src={user.profile_picture} alt={user.first_name} fluid />
                
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{user.first_name} {user.last_name}</h3>
                        </ListGroup.Item>

                       
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Cotact:
                                </Col>
                                <Col>
                                    <strong>{user.contact} {user.email}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    
                   
        
                        <ListGroup.Item>
                            <Row>
                                <Col>Reviews:</Col>
                            <Col>
                         
                            </Col>
                            </Row>
                        </ListGroup.Item>
                        
                       
                       
                    </ListGroup>

                  
                </Col>
              

                <Col md={{ span: 7}} >
                    
                    <ListGroup variant="flush">
                        
                    <ListGroup.Item>
                        <Row>
                            <Col md={{ span: 2 }}> Bio</Col>
                            <Col>
                            {user.bio}<br/><br/>
                            </Col>
                        </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <Row>
                            <Col md={{ span: 2 }}> Eduation</Col>
                            <Col>
                            {user.Eduction}<br/><br/>
                            </Col>
                        </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <Row>
                            <Col md={{ span: 2 }}> Policies</Col>
                            <Col>
                            {user.policies}<br/><br/>
                            </Col>
                        </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <Row>
                            <Col md={{ span: 2 }}> Schedule</Col>
                            <Col>
                            {user.schedule} <br/><br/>
                            </Col>
                        </Row>
                        </ListGroup.Item>
                    

                        </ListGroup>
                        
                </Col>
               
                    
   
            </Row>
            </Container>
        {/* )} */}
    </div>
  );
}

export default TutorDetailScreen;
