import React, { useEffect } from "react";
import { Row, Col, ListGroup, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listScheduleDetails} from "../../../features/redux/actions/scheduleAction";

function ProductScreen() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const scheduleDetails = useSelector((state) => state.scheduleDetails)
  const {schedule} = scheduleDetails
  useEffect(() => {
    dispatch(listScheduleDetails(id))

  }, [dispatch]);


  return (
    <div className="affix ">
  
        <Link to="/lesson-list" className="btn btn-warning btn-outline-dark my-3  ">
            Fuck, Go Back
        </Link>
 
        <Container>
            <Row>
                
                <Col  md={{ span: 3, offset: 1 }} style={{position: "relative"}}>
             
                
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{schedule.lesson_name}</h3>
                        </ListGroup.Item>

                       
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Service:
                                </Col>
                                <Col>
                                    <strong>$ {schedule.rate_hour}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                      
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tutor:
                                </Col>
                                <Col>
                                {schedule.user}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                   
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Subject:
                                </Col>
                                <Col>
                                {schedule.subject_name}
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

export default ProductScreen;
