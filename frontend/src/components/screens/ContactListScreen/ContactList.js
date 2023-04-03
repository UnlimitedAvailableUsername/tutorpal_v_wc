import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listContacts } from "../../../features/redux/actions/contactActions";
import Contact from "../../elements/Contact";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";


function Concernlist() {

  const [search, setSearch] = useState("");
  const dispatch = useDispatch() 

  const contactList = useSelector(state => state.contactList)
  const {contacts} = contactList

  useEffect(() => {
    dispatch(listContacts())
  }, [dispatch]);
 
  const filteredContacts = contacts.filter((contact)=>
  {
    return search.toLowerCase() === '' ? contact : contact.first_name.toLowerCase().includes(search) ||
    contact.last_name.toLowerCase().includes(search) ||
    contact.concern.toLowerCase().includes(search) ||
    contact.comment.toLowerCase().includes(search);
  });

  return (
    <div> 
   
     <div className="tutor-text text-center">
        <p style={{fontSize:150}}>Concerns</p>
     </div>
    
     <Container>
        <Form>
          <Row>
            <Col>
              <Container>
                <Form.Control
                  className="shadow"
                  style={{width:1000, marginLeft:140}}
                  type="search"
                  placeholder="Search for Tutors"
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search"
                /> 
              </Container>
            </Col> 
          </Row>
        </Form>
        <p>Total concerns: {filteredContacts.length}</p>
    
        <Row>
          {filteredContacts.map((contact) => (
            <Col key={contact.id} sm={12} md={6} lg={4} xl={3}>
              <Contact contact={contact} />
            </Col>
          ))}
        </Row>
        
      </Container>
    </div>
  )
}

export default Concernlist;