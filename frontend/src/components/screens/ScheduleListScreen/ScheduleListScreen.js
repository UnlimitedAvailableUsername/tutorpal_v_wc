import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {useDispatch, useSelector} from 'react-redux';
import { listSchedules } from "../../../features/redux/actions/scheduleAction";
import { Row, Col, Container } from "react-bootstrap";
import Schedule from "../../elements/ScheduleOnCard";


function LessonListScreen() {
  
 
  const [search, setSearch] = useState ('')

  const dispatch = useDispatch() 

  const scheduleList = useSelector(state => state.scheduleList)
  const {schedules} = scheduleList

  useEffect(() => {
    dispatch(listSchedules())
   

  }, [dispatch]);
  return (

<div>
 
  
  <div>
<Container>
    
      <p style={{ fontSize: 30 }} className="py-5 text-center">
        Click on each tutor's profile to learn more about the tutor's
        educational background
      </p>
      <p style={{ fontSize: 30 }} className="text-center">
        and experiences.
      </p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Form  ><Row>
        <Col>
            <Form.Control style={{width:1100}}onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-1"
              aria-label="Search"
            /> 
            </Col> 
            
        
            </Row>
          </Form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
   
        <Row>
         {schedules.filter((schedule)=>
        {
          return search.toLowerCase() === '' ? 
          schedule : schedule.lesson_name.toLowerCase().includes(search)||
          schedule.user.toLowerCase().includes(search) ||
          schedule.rate_hour.includes(search) ||
          schedule.subject_name.toLowerCase().includes(search) ||
          schedule.schedule.toLowerCase().includes(search);
        }).map((schedule) => (
            <Col key={schedule.id} sm={12} md={6} lg={4} xl={3}>
              <Schedule schedule={schedule} />
            </Col>
          ))}
        </Row>
  
      </Container>
    </div>
    </div>
  );
}

export default LessonListScreen;