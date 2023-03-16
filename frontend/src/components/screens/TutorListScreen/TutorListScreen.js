import React from 'react';
import { Container } from 'react-bootstrap';
import '../../../assets/components/screens/TutorListScreen/tutorlist.css';

function TutorListScreen() {
  return (
    <div>
      <div className='tutor-bg'></div>
      <div className='tutor-bg-text-overlay text-center' >
          <h1 className='text-uppercase tutor-text-h1'>our tutors</h1>
          <h4 >Click on each tutor's profile to learn more about the tutor's education background and experience.</h4>
      </div>
      <Container>

      </Container>
    </div>
  )
}

export default TutorListScreen;