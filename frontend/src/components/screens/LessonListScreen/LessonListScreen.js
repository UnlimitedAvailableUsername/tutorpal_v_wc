import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {useDispatch, useSelector} from 'react-redux';
import { listProducts } from "../../../features/redux/actions/productAction";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../../elements/LessonOnCard";


function LessonListScreen() {
  
 
  const [search, setSearch] = useState ('')

  const dispatch = useDispatch() 

  const productList = useSelector(state => state.productList)
  const {products} = productList

  useEffect(() => {
    dispatch(listProducts())
   

  }, [dispatch]);
  return (

<div>
 
  
  <div>
<Container>
    
      <p style={{ fontSize: 30 }} class="py-5 text-center">
        Click on each tutor's profile to learn more about the tutor's
        educational background
      </p>
      <p style={{ fontSize: 30 }} class="text-center">
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
         {products.filter((product)=>
        {
          return search.toLowerCase() === '' ? 
          product : product.lesson_name.toLowerCase().includes(search)||
          product.user.toLowerCase().includes(search) ||
          product.rate_hour.includes(search) ||
          product.subject_name.toLowerCase().includes(search) ||
          product.schedule.toLowerCase().includes(search);
        }).map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
  
      </Container>
    </div>
    </div>
  );
}

export default LessonListScreen;