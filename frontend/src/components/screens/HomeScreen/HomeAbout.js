import { Container } from 'react-bootstrap';
import '../../../assets/components/screens/HomeScreen/Homeabout.css'



function HomeAbout() {
  return (
    <div className="hero-image">
      <div className="hero-text">
        <Container>
          <p className='text-center display-1'>YEP, YOU CAN LEARN THAT</p>
          <h4 className='text-center'>TutorPal is the best way to learn anything. No matter what you’re interested in, we’ll help you find, book lessons and stay in touch with the perfect instructor. You can spend more time learning, and we’ll handle the rest. </h4>
        </Container>
      </div>
    </div>
  );
}

export default HomeAbout;
