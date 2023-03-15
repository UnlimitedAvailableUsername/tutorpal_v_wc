import React from 'react';
import { Container } from 'react-bootstrap';
import '../../../assets/components/screens/TutorListScreen/tutorlist.css';

function TutorListScreen() {
  return (
    <div>
      <div className='tutor-bg'></div>
      <div className='tutor-text-bg' >
        <Container>
            <h1 className='text-uppercase tutor-text text-light'>our tutors</h1>
            <h4 className='.tutor-text text-light'>Click on each tutor's profile to learn more about the tutor's education background and experience.</h4>
        </Container>
      </div>
      <Container>

      </Container>
    </div>
  )
}

export default TutorListScreen;